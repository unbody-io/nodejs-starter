import { UnbodyPushAPI } from "unbody/push"
import { STORAGE_PATH, SUPPORTED_FILE_EXTENSIONS } from "../configs"
import { SourceTypes, UnbodyAdmin } from "unbody/admin"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from 'uuid'
import { toFormData } from "axios"
import { admin } from "../admin-client"

if (!process.env.UNBODY_PROJECT_ID) {
    throw new Error('UNBODY_PROJECT_ID must be set')
}

// RUN UPON CHANGES TO THE KNOWLEDGE BASE
export const run = async () => {
    const project = await admin.projects.get({
        id: process.env.UNBODY_PROJECT_ID as string,
    });

    if (!project) {
        throw new Error('Project not found')
    }

    // get the custom data source instance
    const customDataSource = await project.sources.ref({ 
        name: 'kb-static-knowledgebase', 
        type: SourceTypes.PushApi 
    })


    // create a new push api instance
    // we need push api instance to upload the files to the custom data source
    const push = new UnbodyPushAPI({
        auth: {
            apiKey: process.env.UNBODY_API_KEY,
        },
        projectId: project.id,
        sourceId: customDataSource.id,
    })

    // read the files from the storage path
    const files = fs
        .readdirSync(STORAGE_PATH)
        // filter the files by the supported file extensions
        .filter((file) => SUPPORTED_FILE_EXTENSIONS.includes(path.extname(file)))
        // map the files to the file paths
        .map((file) => path.join(STORAGE_PATH, file))


    // upload the files to the push api
    for (const filePath of files) {
        const form = toFormData({})

        form.append('id', uuidv4())
        form.append('payload', JSON.stringify({}))
        form.append(
            'file',
            await fs.promises.readFile(filePath),
            path.basename(filePath),
        )

        await push.files.upload({ form })
    }

    // very important to update the custom data source
    // to make the changes effective
    return customDataSource.update();
}

