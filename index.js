const core = require('@actions/core');
const axios = require('axios');

const sendDispatch = async () => {
    const notifyRepo = core.getInput('notifyRepo');
    const eventType = core.getInput('eventType');

    const gitToken = process.env.GITHUB_TOKEN;

    const response = await axios.post(
        `https://api.github.com/repos/${notifyRepo}/dispatches`,
        {
            event_type: eventType
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.everest-preview+json',
                Authorization: `Bearer ${gitToken}`,
            },
        });

    return response.data;
}

sendDispatch().catch(error => core.setFailed(error.message));
