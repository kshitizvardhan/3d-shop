import express from "express";
import * as dotenv from "dotenv";
import OpenAI from 'openai';


dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

router.route('/').get((req,res) => {
    res.status(200).json({
        message: "Hello from DALL.E ROUTES"
    })
})

router.route("/").post(async (req,res) => {
    try {
        // getting the prompt sent from frontend
        const {prompt} = req.body;

        // send request to generate the image
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })

        // Now get the image
        const image = response.data.data[0].b64_json;

        // Now pass it to frontend
        res.status(200).json({ photo: image });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went Wrong" })
    }

})

export default router