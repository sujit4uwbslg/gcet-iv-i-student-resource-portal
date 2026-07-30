import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    repo: "sujit4uwbslg/gcet_IV-I_2025"
  });
});

// GitHub Live Tree Proxy with 5-min caching
let cachedTree: any = null;
let lastFetchTime = 0;

app.get("/api/github-tree", async (req, res) => {
  try {
    const now = Date.now();
    // Cache for 5 minutes (300,000 ms)
    if (cachedTree && (now - lastFetchTime < 300000)) {
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
  } catch (err: any) {
    console.error("Error fetching GitHub tree:", err.message);
    res.status(500).json({ error: "Failed to fetch live repository tree", message: err.message });
  }
});

// Proxy for fetching text/markdown/code file contents
app.get("/api/file-content", async (req, res) => {
  const filePath = req.query.path as string;
  if (!filePath) {
    return res.status(400).json({ error: "Missing path parameter" });
  }

  try {
    const encodedPath = filePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
    const rawUrl = `https://raw.githubusercontent.com/sujit4uwbslg/gcet_IV-I_2025/main/${encodedPath}`;

    const response = await fetch(rawUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: `File not found or unreachable (${response.status})` });
    }

    const text = await response.text();
    res.json({ path: filePath, content: text, rawUrl });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch file content", message: err.message });
  }
});

// AI Study Tutor endpoint
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

    // Construct prompt
    let prompt = `${systemInstruction}\n\n`;
    if (Array.isArray(history) && history.length > 0) {
      prompt += "Previous conversation history:\n";
      for (const msg of history.slice(-6)) {
        prompt += `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.text}\n`;
      }
    }
    prompt += `\nStudent Question: ${question}\n\nDetailed Helpful Answer:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const answer = response.text || "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";
    res.json({ answer });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to query AI Assistant", message: err.message });
  }
});

// Vite Middleware for Development vs Production Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GCET IV-I Course Portal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
