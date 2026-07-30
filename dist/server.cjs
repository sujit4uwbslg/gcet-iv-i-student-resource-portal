var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new import_genai.GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    repo: "sujit4uwbslg/gcet_IV-I_2025"
  });
});
var cachedTree = null;
var lastFetchTime = 0;
app.get("/api/github-tree", async (req, res) => {
  try {
    const now = Date.now();
    if (cachedTree && now - lastFetchTime < 3e5) {
      return res.json({ source: "cache", tree: cachedTree });
    }
    const response = await fetch("https://api.github.com/repos/sujit4uwbslg/gcet_IV-I_2025/git/trees/main?recursive=1", {
      headers: {
        "User-Agent": "GCET-Student-Portal",
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (!response.ok) {
      if (cachedTree) {
        return res.json({ source: "stale-cache", tree: cachedTree });
      }
      throw new Error(`GitHub API HTTP ${response.status}`);
    }
    const data = await response.json();
    cachedTree = data.tree || [];
    lastFetchTime = now;
    res.json({ source: "live", tree: cachedTree });
  } catch (err) {
    console.error("Error fetching GitHub tree:", err.message);
    res.status(500).json({ error: "Failed to fetch live repository tree", message: err.message });
  }
});
app.get("/api/file-content", async (req, res) => {
  const filePath = req.query.path;
  if (!filePath) {
    return res.status(400).json({ error: "Missing path parameter" });
  }
  try {
    const encodedPath = filePath.split("/").map((segment) => encodeURIComponent(segment)).join("/");
    const rawUrl = `https://raw.githubusercontent.com/sujit4uwbslg/gcet_IV-I_2025/main/${encodedPath}`;
    const response = await fetch(rawUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: `File not found or unreachable (${response.status})` });
    }
    const text = await response.text();
    res.json({ path: filePath, content: text, rawUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch file content", message: err.message });
  }
});
app.post("/api/ai-tutor", async (req, res) => {
  const { question, history } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question parameter is required" });
  }
  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({
      error: "Gemini API key is not configured.",
      fallbackAnswer: "Gemini API key is required to ask AI questions. You can configure your GEMINI_API_KEY in secrets."
    });
  }
  try {
    const systemInstruction = `
You are the official AI Study Assistant for the GCET IV-I Deep Learning Course (2025-2026), created for students of Geethanjali College of Engineering and Technology.
The course repository is https://github.com/sujit4uwbslg/gcet_IV-I_2025.

Repository Structure Context:
- Textbooks: Goodfellow Deep Learning (MIT Press), Chollet Deep Learning with Python, PyTorch Guide, Seth Weidman Deep Learning from Scratch, Gilbert Strang Linear Algebra, Carl Meyer Matrix Analysis.
- Unit 1: Foundations, McCulloch-Pitts Neuron, Perceptrons, Activation Functions (Sigmoid, ReLU, Softmax), XOR logic, xor_mcp.ipynb.
- Unit 2: Optimization, Gradient Descent, Backpropagation chain rule derivation, Momentum, RMSProp, Adam.
- Unit 3: Autoencoders (Denoising, Contractive), MNIST classification notebook, L1/L2 Regularization, Dropout.
- Unit 4: Convolutional Neural Networks (CNN), Max-Pooling, Strides, Stanford CS231n slides, VGG, ResNet, Transfer Learning.
- Unit 5: Recurrent Neural Networks (RNN), BPTT, LSTM cells (Forget/Input/Output gates), GRU, Attention Mechanism, Transformers (Vaswani et al.), Stanford CS224n.
- Lab: Week 1 to Week 10 Jupyter Notebooks, DL Lab Manual 26-27.pdf.
- Important Notes: DL Important Questions, Math Problem Solutions, DL Rhymes, PCA, Eigenvalues.

Guidance:
- Provide clear, encouraging, mathematically accurate, step-by-step explanations suited for IV Year Computer Science students.
- When applicable, reference the specific Unit, Textbook, Lab Week, or Important Notes PDF from the GCET IV-I course.
- Use clear formatting with Markdown, bullet points, and code blocks for Python/PyTorch/NumPy.
`;
    let prompt = `${systemInstruction}

`;
    if (Array.isArray(history) && history.length > 0) {
      prompt += "Previous conversation history:\n";
      for (const msg of history.slice(-6)) {
        prompt += `${msg.role === "user" ? "Student" : "Tutor"}: ${msg.text}
`;
      }
    }
    prompt += `
Student Question: ${question}

Detailed Helpful Answer:`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    const answer = response.text || "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";
    res.json({ answer });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to query AI Assistant", message: err.message });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GCET IV-I Course Portal Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
