const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Constructs the specific prompt based on the selected mode.
 * Satisfies: Prompt Engineering Requirement (Role, Context, Rules)
 */
const generatePrompt = (input, mode) => {
    switch (mode) {
        case 'explain':
            return `
                ROLE: You are an experienced university instructor.
                TASK: Explain the following concept to a beginner student.
                RULES: 
                1. Use simple, easy-to-understand language.
                2. Keep the explanation under 150 words.
                3. Use an analogy if helpful.
                INPUT CONCEPT: "${input}"
            `;
        
        case 'summarize':
            return `
                ROLE: You are an expert academic researcher.
                TASK: Summarize the provided text into key bullet points.
                RULES:
                1. Capture the main ideas only.
                2. Be concise.
                3. Format the output as a Markdown list.
                INPUT TEXT: "${input}"
            `;

        case 'improve':
            return `
                ROLE: You are a professional editor.
                TASK: Rewrite the following text to improve grammar, clarity, and flow.
                RULES:
                1. Maintain the original meaning.
                2. Make it sound more professional.
                3. Highlight changes if possible (optional).
                INPUT TEXT: "${input}"
            `;

        case 'mcq':
            return `
                ROLE: You are an exam setter.
                TASK: Generate 3 Multiple Choice Questions (MCQs) based on the input topic.
                RULES:
                1. Output MUST be a valid JSON array.
                2. Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
                3. Structure: [{ "question": "...", "options": ["A", "B", "C", "D"], "answer": "Correct Option" }]
                INPUT TOPIC: "${input}"
            `;

        default:
            throw new Error("Invalid mode selected");
    }
};

exports.generateContent = async (input, mode) => {
    try {
        const prompt = generatePrompt(input, mode);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Cleanup for MCQ mode if the AI adds markdown blocks accidentally
        if (mode === 'mcq') {
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        return text;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Failed to generate content from AI provider.");
    }
};