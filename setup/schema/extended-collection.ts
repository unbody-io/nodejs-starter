import { CustomSchema } from "unbody/admin";

// This is an example of how you can extend an native collection in Unbody
// you will need to add this to project settings (setup-project.ts)

export const extendedSpreadsheetSchema = new CustomSchema.Collection('Spreadsheet').add(
  // Example text array field
  new CustomSchema.Field.Text('xTopics', 'Extracted topics from the spreadsheet', true),

  // Example array field
  new CustomSchema.Field.Text('xFaq', 'List of FAQ\'s from the spreadsheet', true),
)