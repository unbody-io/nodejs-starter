# Unbody Backend Starter

A TypeScript-based backend template for Unbody integration, providing AI-powered content management capabilities.

## Project Structure

```
.
├── backend/                 # Backend services and configurations
│   ├── admin-client.ts     # Unbody admin client configuration
│   ├── configs.ts          # Project configurations and constants
│   ├── run.ts              # Script runner for backend operations
│   ├── setup-project.ts    # Project initialization and setup
│   ├── enhancers/          # Custom content enhancers
│   └── data-sources/       # Data source configurations
└── package.json           # Project dependencies and scripts
```

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Unbody account and credentials

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
UNBODY_ADMIN_ID=your_admin_id
UNBODY_ADMIN_SECRET=your_admin_secret
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

## Unbody Integration

### One-Time Setup Routines

These commands need to be run only once when setting up the project:

1. Initialize the Unbody project:
   ```bash
   yarn unbody-backend:setup-project
   ```
   This creates a new project in Unbody with configured AI services and settings.

2. Create data sources:
   ```bash
   yarn unbody-backend:data-sources:push-datasource-create
   ```
   This sets up the data sources that will be used to push content to Unbody.

### Recurring Data Update Routines

These commands should be run whenever your local data changes:

1. Update data sources with new content:
   ```bash
   yarn unbody-backend:data-sources:push-datasource-update
   ```
   This pushes any new or updated content to Unbody.

2. Seed initial data (if needed):
   ```bash
   yarn unbody-backend:seed-recipes
   ```
   This can be used to populate initial data in your Unbody project.

## Backend Configuration

The backend is configured with the following AI services:

- Text Vectorizer: OpenAI Text Embedding 3 Large
- Generative Model: OpenAI GPT-4
- Reranker: Cohere English V3
- Auto Summary: OpenAI GPT-4 Mini
- Auto Vision: OpenAI GPT-4

## Project Settings

The project is configured with:
- Project Name: sanoflow-io-demo
- Website URL: https://novomed.com
- Storage Path: SANOFLOW_STORAGE/kb

Supported file extensions:
- PDF, DOCX, DOC, TXT, MD, CSV, XLS, XLSX

## Development Workflow

1. For new projects, run the one-time setup routines in order:
   ```bash
   yarn unbody-backend:setup-project
   yarn unbody-backend:data-sources:push-datasource-create
   ```

2. When your local data changes, run the update routine:
   ```bash
   yarn unbody-backend:data-sources:push-datasource-update
   ```

## License

This project is licensed under the MIT License. 