import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {ChatPromptTemplate} from "@langchain/core/prompts"
import {StringOutputParser} from "@langchain/core/output_parsers"
import { configDotenv } from "dotenv"

configDotenv()
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
})

const promptTemplate  = ChatPromptTemplate.fromMessages([
    ["system", "You are an expert in {area_of_expertise}"],
    ["user", "{question}"]
])

const stringParser = new StringOutputParser()

const chatChain = promptTemplate.pipe(model).pipe(stringParser)

const response = await chatChain.invoke({
    area_of_expertise: "Computer Engineering",
    question: "How do CPUs Work?"
})

console.log(response)