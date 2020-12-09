const core = require('@actions/core');
const github = require('@actions/github');
const util = require('util');

const sendDispatch = async () => {
    const notifyRepo = core.getInput('notifyRepo');
    const event_type = core.getInput('eventType');
    const token = process.env.GITHUB_TOKEN;

    core.setCommandEcho(true);

    const context = github.context;

    const [owner, repo] = notifyRepo.split('/');
    const client_payload = {
        repo: `${context.repo.owner}/${context.repo.repo}`,
        ref: context.ref,
        sha: context.sha,
    }

    const octokit = github.getOctokit(token);

    core.info('Creating ' + event_type + ' respository dispatch for ' + notifyRepo);
    core.debug('Client payload: ' + JSON.stringify(client_payload));

    await octokit.repos.createDispatchEvent({
        owner,
        repo,
        event_type,
        client_payload,
    })
}

sendDispatch()
    .catch(error => {
        core.debug(util.inspect(error));

        if (error.status === 404) {
            core.setFailed('Repository not found OR token does not have sufficient permission');
        } else {
            core.setFailed(error.message);
        }
    });
