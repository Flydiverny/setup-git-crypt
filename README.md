# setup-git-crypt

This is a GitHub Action for setting up git-crypt in a GitHub Actions workflow. Git-crypt is a tool for encrypting and decrypting files in a Git repository.
The action will download the source for the git-crypt CLI and build it in runtime, it may also be cached in the tools cache.

**v4**:

- works on ubuntu 22+
- uses a fork of git-crypt https://github.com/maxisam/git-crypt/

**v3**:

- works on ubuntu 20 and 22
- uses https://github.com/AGWA/git-crypt

## Pre-requisite for self-hosted runners

This action requires openssl and openssl-devel to be installed on your runner (exists by default on github hosted runners).

```
yum install openssl openssl-devel
```

## Usage

To use this action in your workflow, add it as a step in your `.yml` file like this:

```yaml
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: flydiverny/setup-git-crypt@v4
```

In this example, the `setup-git-crypt` action is added as a step in the `build` job, and it will be run when the workflow is triggered. The `setup-git-crypt` action will install and configure git-crypt in the environment where the action is running, allowing you to use git-crypt in the rest of your workflow.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.
