import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { configDotenv } from "dotenv";

configDotenv()

const chat = new ChatOpenAI({
    model: "gpt-4o",
    apiKey: process.env.OPENAI_API_KEY
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `Reply every prompt in Spanish`] ,
    ["user", "{input}"]
]);


const chainToCancel = promptTemplate.pipe(chat)

const controller = new AbortController()

console.time("CancellationTimer");

// setTimeout(()=> {
//     controller.abort()
// }, 100)

try {
    setTimeout(()=> {
        controller.abort()
    }, 100)
    await chainToCancel.invoke({
        input: "When was the Eiffel Tower built"
    },{
        signal: controller.signal
    })
} catch (error) {
    console.log(error)
}

console.timeEnd("CancellationTimer")