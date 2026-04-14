import {ChatOllama} from "@langchain/ollama"

const localModel = new ChatOllama({
    model: "llama3:latest"
})

const prompt = "What is 'Thank you very much, see you next time' in French"

const response = await localModel.invoke(prompt)

console.log(response.content)