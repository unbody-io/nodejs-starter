import { Unbody } from 'unbody'
import { divider } from './utils'
if (!process.env.UNBODY_PROJECT_ID || !process.env.UNBODY_API_KEY) {
    throw new Error('UNBODY_PROJECT_ID and UNBODY_API_KEY must be set.')
}

const run = async () => {

    const unbody = new Unbody({
        projectId: process.env.UNBODY_PROJECT_ID as string,
        apiKey: process.env.UNBODY_API_KEY as string,
    })

    const exampleQuery = "What is the capital of France?"


    // 1. Search for the most relevant documents
    const { data: { payload } } = await unbody.get
                                              .collection("Spreadsheet")
                                              .select("xFaq", "xTopics", "autoSummary", "name")
                                              .search.about(exampleQuery)
                                              .limit(10)
                                              .exec();
    console.log(divider())
    console.log(`Found ${payload.length} results`)
    console.log(payload.map((p) => p.name).join("\n"))
    console.log(divider())

    //2. Generate a response using the most relevant documents
    const { data: { payload: response } } = await unbody.generate.text([
        {
            role: "user",
            content: exampleQuery
        },
        {
            role: "system",
            content: `
            You are a helpful assistant that can answer questions about the following documents:
            ${payload.map((p) => `${p.name}:\n${p.autoSummary}`).join("\n\n")}
            `
        }
    ])

    console.log(divider())
    console.log(response)
    console.log(divider())
}








