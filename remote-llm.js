import {ChatOpenAI} from "@langchain/openai"
import { configDotenv } from "dotenv"

configDotenv();



const openAIModel = new ChatOpenAI({
    model: "gpt-4o",
    apiKey: process.env.OPENAI_API_KEY

})

const response = await openAIModel.invoke("What is the capital of France?")

console.log(response)