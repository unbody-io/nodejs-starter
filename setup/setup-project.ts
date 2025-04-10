import {
  AutoSummary,
  AutoVision,
  CustomSchema,
  Enhancement,
  Generative,
  ProjectSettings,
  Reranker,
  SourceTypes,
  TextVectorizer,
} from 'unbody/admin'

import { extendedSpreadsheetSchema } from './schema/extended-collection'
import { PROJECT_NAME } from './configs'
import { sheetEnhancer } from './enhancers/spreadsheet.enhancer'
import { admin } from './admin-client'

const settings = new ProjectSettings()

settings
  // the text vectorizer is used to vectorize the text of the spreadsheet
  .set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large))
  // the generative model is used to generate the summary of the spreadsheet
  .set(new Generative(Generative.OpenAI.GPT4o))
  // the reranker is used to rerank the results of the search
  .set(new Reranker(Reranker.Cohere.EnglishV3))

  // Auto enhancers (Unbody's built-in enhancers)
  // AutoSummary is used to generate the summary of textual content
  .set(new AutoSummary(AutoSummary.OpenAI.GPT4oMini))
  // AutoVision is used to apply vision to images (genartive captioning, OCR, and image tagging)
  .set(new AutoVision(AutoVision.OpenAI.GPT4o))


// settings.set(new CustomSchema().extend(extendedSpreadsheetSchema))


// // Add custom collections (if you want to add custom collections)
// // Enhancement - Extended schemas
settings.set(
  new CustomSchema().extend(
    extendedSpreadsheetSchema
  )
);

// // Add custom enhancers (if you want to add custom enhancers)
settings.set(
  new Enhancement().add(sheetEnhancer)
)


export const run = async () => {
  const requirements = ['UNBODY_ADMIN_ID', 'UNBODY_ADMIN_SECRET']

  for (const requirement of requirements) {
    if (!process.env[requirement]) {
      throw new Error(`Missing environment variable: ${requirement}`)
    }
  }

  // Delete existing project with the same name
  // We need to do this because if a project settings has been changed, the project will not be updated
  // So we need to delete the existing project and create a new one
  const { projects } = await admin.projects.list({
    filter: {
      name: PROJECT_NAME,
    },
  })

  if (projects.length > 0) {
    for (const project of projects) {
      await admin.projects.delete({ id: project.id })
      console.log('deleted project:', project.id)
    }
  }

  // Create a new project with the new settings
  const project = await admin.projects
    .ref({ name: PROJECT_NAME, settings })
    .save()
  console.log('created project:', project.id)

  // Since we have our data on our own server, we can use the Push API to push our data to Unbody
  // So we need to create a custom data source
  const customDataSource = await project.sources
    .ref({
      name: 'custom-data-source',
      type: SourceTypes.PushApi,
    })
    .save()

    await customDataSource.initialize()

  // const apiKey = await project.apiKeys.ref({ name: 'demo' }).save()
  // you should save this API key in your `.env`
  // alternatively you can also create and manage your API keys on the dashboard
  console.log(`https://app.unbody.io/projects/${project.id}/settings/developer`)
}
