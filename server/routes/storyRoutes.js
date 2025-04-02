import express from "express";
import axios from "axios";
import Story from "../models/Story.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("Sending request to Hugging Face with prompt:", prompt);
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      { inputs: prompt, max_length: 100 },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Hugging Face response:", response.data);
    const generatedText = response.data[0]?.generated_text || "No text generated";
    const newStory = new Story({ prompt, content: generatedText });
    await newStory.save();

    res.json({ story: newStory });
  } catch (error) {
    console.error("Error in /generate:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate story", details: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

export default router;