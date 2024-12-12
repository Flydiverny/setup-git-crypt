import * as core from '@actions/core'
// import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'
import * as os from 'os'
import * as path from 'path'
import {chmod, copyFile, mkdir} from 'fs/promises'

async function run(): Promise<void> {
  if (process.env.ImageOS === 'ubuntu20') {
    core.error(
      'Please use previous version of setup-git-crypt, this version requires ubuntu22 or higher'
    )
    core.setFailed(
      'Please use previous version of setup-git-crypt, this version requires ubuntu22 or higher'
    )
    process.exit(1)
  }

  const version = core.getInput('version')

  try {
    let toolPath: string = tc.find('git-crypt', version)

    // If not found in cache, download
    if (toolPath) {
      core.info(`Found in cache @ ${toolPath}`)
    } else {
      const destination = path.join(os.homedir(), '.git-crypt/')
      core.info(`Install destination is ${destination}`)

      const downloaded = await tc.downloadTool(
        `https://github.com/maxisam/git-crypt/releases/download/${version}/git-crypt-${version}-linux-x86_64`
      )

      await mkdir(destination, {recursive: true})
      await chmod(downloaded, 0o755)

      await copyFile(downloaded, path.join(destination, 'git-crypt'))

      toolPath = await tc.cacheDir(destination, 'git-crypt', version)
    }

    core.addPath(toolPath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
