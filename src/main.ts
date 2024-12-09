import * as core from '@actions/core'
// import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'
import * as os from 'os'
import * as path from 'path'
import {copyFile} from 'fs/promises'

async function run(): Promise<void> {
  const version = core.getInput('version')

  try {
    let toolPath: string = tc.find('git-crypt', version)

    // If not found in cache, download
    if (toolPath) {
      core.info(`Found in cache @ ${toolPath}`)
    } else {
      const destination = path.join(os.homedir(), '.git-crypt/')
      core.info(`Install destination is ${destination}`)

      // const downloaded = await tc.downloadTool(
      //   `https://www.agwa.name/projects/git-crypt/downloads/git-crypt-${version}.tar.gz`
      // )

      const downloaded = await tc.downloadTool(
        `https://github.com/maxisam/git-crypt/releases/download/${version}/git-crypt-${version}-linux-x86_64`,
      )

      await copyFile(downloaded, path.join(destination, 'git-crypt'))

      // const extractedPath = await tc.extractTar(downloaded, destination)
      // const workspace = path.join(extractedPath, `git-crypt-${version}`)
      // core.info(`Extracted ${downloaded} to ${extractedPath}`)

      // let extraArgs: string[] = []

      // if (process.env.ImageOS === 'ubuntu22') {
      //   extraArgs = [`CXXFLAGS='-DOPENSSL_API_COMPAT=0x30000000L'`]
      // }

      // await exec.getExecOutput(
      //   'make',
      //   ['install', `PREFIX=${extractedPath}`, ...extraArgs],
      //   {
      //     cwd: workspace
      //   }
      // )

      toolPath = await tc.cacheDir(destination, 'git-crypt', version)
    }

    core.addPath(toolPath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
