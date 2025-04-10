import { SourceTypes } from "unbody/admin"
import { admin } from "../admin-client";


if (!process.env.UNBODY_PROJECT_ID) {
    throw new Error('UNBODY_PROJECT_ID must be set')
}

// ONLY RUN ONCE
export const run = async () => {
    const project = await admin.projects.get({
        id: process.env.UNBODY_PROJECT_ID as string,
    });

    if (!project) {
        throw new Error('Project not found')
    }

    const customDataSource = await project.sources.ref({
        name: 'kb-static-knowledgebase',
        type: SourceTypes.PushApi,
    }).save()

    await customDataSource.initialize()

    console.log('created customDataSource:', customDataSource.id)
    console.log(
        'https://app.unbody.io/projects/' + project.id + '/sources/' + customDataSource.id,
    );
}
