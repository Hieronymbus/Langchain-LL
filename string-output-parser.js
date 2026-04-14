import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {StringOutputParser} from "@langchain/core/output_parsers"

const myModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
})

const response = await myModel.invoke("What do you think about humming birds")

const stringParser = new StringOutputParser()

const birdFacts = await stringParser.parse(response.content)

console.log(typeof birdFacts);