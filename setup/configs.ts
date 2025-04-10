import path from "path"

export const STORAGE_PATH = path.join(__dirname, '..', `/files`)
console.log('STORAGE_PATH', STORAGE_PATH)
export const PROJECT_NAME = 'my-first-unbody-project'

export const SUPPORTED_FILE_EXTENSIONS = [
  '.pdf',
  '.docx',
  '.doc',
  '.txt',
  '.md',
  '.csv',
  '.xls',
  '.xlsx',
]