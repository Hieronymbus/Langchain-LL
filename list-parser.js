import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {PromptTemplate} from "@langchain/core/prompts"
import {CommaSeparatedListOutputParser} from "@langchain/core/output_parsers"
import { configDotenv } from "dotenv";

configDotenv()

const myModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
})

const templateString = "List 10 countries in {continent}.\n{format_instructions}"

const template = PromptTemplate.fromTemplate(templateString)

const listParser = new CommaSeparatedListOutputParser()

const formatInstructions = listParser.getFormatInstructions()

//console.log(formatInstructions)

const chain  = template.pipe(myModel)

const response = await chain.invoke({
    continent: "Europe",
    format_instructions: formatInstructions
})

const listOutput = await listParser.parse(response.content)

console.log(listOutput)