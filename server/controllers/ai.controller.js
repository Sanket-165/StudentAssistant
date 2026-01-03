const aiService = require('../services/ai.service');

exports.generateResponse = async (req, res) => {
    try {
        const { prompt, mode } = req.body;

        // Validation
        if (!prompt || !mode) {
            return res.status(400).json({ error: "Prompt and Mode are required fields." });
        }

        const validModes = ['explain', 'summarize', 'improve', 'mcq'];
        if (!validModes.includes(mode)) {
            return res.status(400).json({ error: "Invalid mode selected." });
        }

        // Call Service
        const aiResponse = await aiService.generateContent(prompt, mode);

        // If mode is MCQ, try to parse JSON to ensure validity before sending
        let finalResponse = aiResponse;
        if (mode === 'mcq') {
            try {
                finalResponse = JSON.parse(aiResponse);
            } catch (e) {
                // If parsing fails, send as text but warn
                console.warn("Could not parse MCQ JSON, sending raw text");
            }
        }

        res.status(200).json({ 
            success: true, 
            data: finalResponse 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};