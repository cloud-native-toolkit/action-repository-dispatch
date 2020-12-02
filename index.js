const core = require('@actions/core');
const fetch = require('node-fetch');

const sendDispatch = async () => {
    const notifyRepo = core.getInput('notifyRepo');
    const eventType = core.getInput('eventType');

    const gitToken = process.env.GITHUB_TOKEN;

    core.setCommandEcho(true);

    const url = `https://api.github.com/repos/${notifyRepo}/dispatches`;
    const body = JSON.stringify({
        event_type: eventType
    });

    console.log(`Dispatching event: ${url}`, body);

    const response = await fetch(
        url,
        {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.everest-preview+json',
                Authorization: `token ${gitToken}`,
            },
        });

    console.log(`Event dispatched: ${eventType}`);
}

sendDispatch()
    .catch(error => {
        console.error('Error dispatching event', error);
        core.setFailed(error.message);
    });
