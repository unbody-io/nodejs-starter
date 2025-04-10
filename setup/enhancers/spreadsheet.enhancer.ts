import { CustomSchema, Enhancement } from "unbody/admin";


export const sheetEnhancer = new Enhancement.Pipeline(
    // the name of the enhancement pipeline
    'summary_generation',
    // the name of the collection
    'Spreadsheet',
  )

  // add a step to the enhancement pipeline
  sheetEnhancer.add(
    // we need one step fot this enhancement pipeline
    // we want to collect and concatenate the entire content of the spreadsheet into a single string
    // for this we override the `autoSummary` field
    new Enhancement.Step(
      // the name of the step
      'summary_generation',
      // the action to perform
      new Enhancement.Action.Summarizer({
        // the model to use
        model: 'openai-gpt-4o',
        // the prompt to use
        prompt: `Please analyze the following spreadsheet and turn it into a human-readable format while preserving the hierarchical structure of the data.
              ---
              {metadata}
              ---
              {text}            
              ---
              `,

        // the text is the input to the Summarizer action
        // so we need to concatenate the entire content of the spreadsheet into a single string and pass it to the prompt
        text: (ctx) => ctx.record.rows.map((row: any) => row.csv).join('\n'),

        // the metadata can be used to inject additional information into the prompt
        metadata: (ctx) => '',
      }),
      {
        // the output of the step
        output: {
            // this will override the `autoSummary` field in the collection in the database
          autoSummary: (ctx) => ctx.result.summary,
        },
      },
    ),
  )
  



// this would be needed if we wanted to extend the schema of the collection

// export const extendedSpreadsheetSchema = new CustomSchema.Collection('Spreadsheet').add(
//     new CustomSchema.Field.Text('xText', 'Text of the spreadsheet', false, 'word', true),
// )
