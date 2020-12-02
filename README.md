# GitHub Action: Send repository dispatch

Github action that sends a repository dispatch event to the provided repository

## Inputs

### `notifyRepo`

**Required** The git repository to which the event should be sent

### `eventType`

**Optional** The type of event that should be dispatched. Default to `released`

## Environment variables

### `GITHUB_TOKEN`

**Required** The token that should be used to authenticate to the target repository

## Example usage

```yaml
uses: ibm-garage-cloud/action-repository-dispatch@main
with:
  notifyRepo: ibm-garage-cloud/ibm-garage-iteration-zero
  eventType: released
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```