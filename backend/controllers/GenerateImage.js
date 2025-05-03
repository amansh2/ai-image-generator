const dotenv = require("dotenv");
const createError = require("../error");
const { GoogleGenAI, Modality } = require("@google/genai");
dotenv.config();

module.exports = {
  generateImage: async (req, res, next) => {
    try {
        let {prompt} = req.body;
        if (!prompt) {
            prompt = 'empty';
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp-image-generation",
            contents: prompt,
            config: {
              responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
          });

          const parts = response.candidates?.[0]?.content?.parts || [];
          let base64Image = null;
    
          for (const part of parts) {
            if (part.inlineData) {
              base64Image = part.inlineData.data;
              break; // Only taking the first image
            }
          }

        // console.log(base64Image)?
        if (!base64Image) {
        return res.status(500).json({ success: false, message: "No image returned." });
      }
      res.status(200).json({photo: base64Image});

    } catch (error) {
      console.error("Error from Gemini:", error);
      return next(
        createError(
          error.status || 500,
          error?.message || "Unknown error from image generation"
        )
      );
    }
  },
};
