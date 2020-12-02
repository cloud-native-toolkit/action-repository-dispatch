const core = require('@actions/core');
const fetch = require('node-fetch');

const sendDispatch = async () => {
    const notifyRepo = core.getInput('notifyRepo');
    const eventType = core.getInput('eventType');

    const gitToken = process.env.GITHUB_TOKEN;

    core.setCommandEcho(true);

    const url = `https://api.github.com/repos/${notifyRepo}/dispatches`;

    console.log(`Dispatching event: ${url}`);

    const response = await fetch(
        url,
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

sendDispatch()
    .then(data => console.log('Result from dispatch', data))
    .catch(error => {
        console.error('Error dispatching event', error);
        core.setFailed(error.message);
    });
