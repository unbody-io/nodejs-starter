import { CustomSchema } from 'unbody/admin'


// This is an example of how you can define a new collection in Unbody
// you will need to add this to project settings (setup-project.ts)

export const exampleRecipeCollection = new CustomSchema.Collection('RecipeCollection').add(
  // Example text field
  new CustomSchema.Field.Text('title', '', false),

  // Example array field
  new CustomSchema.Field.Text('meta', '', true, 'word', true),

  // number field
  new CustomSchema.Field.Number('prepTimeMinutes', ''),
)