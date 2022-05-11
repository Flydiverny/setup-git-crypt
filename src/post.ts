import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    await exec.getExecOutput('git-crypt', ['lock'])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
