const core = require('@actions/core');
const fetch = require('node-fetch');

const sendDispatch = async () => {
    const notifyRepo = core.getInput('notifyRepo');
    const eventType = core.getInput('eventType');

    const gitToken = process.env.GITHUB_TOKEN;

    const response = await fetch(
        `https://api.github.com/repos/${notifyRepo}/dispatches`,
        {
            method: 'POST',
            body: {
                event_type: eventType
            },
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.everest-preview+json',
                Authorization: `token ${gitToken}`,
            },
        });

    return response.json();
}

sendDispatch().catch(error => core.setFailed(error.message));
