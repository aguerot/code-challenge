# CLI consent management

This app expose API under a `Command Line Interface` instead of `REST` 

## Usage

Build the `CLI` sa an NX app with the usual command
> nx build cli

Then execute `CLI` as any `NodeJS` application with the command
> node dist/apps/cli/main.js

Doing so shows help for each command group exposed. Here `user` and `consent`.

![CLI command groups](/doc/assets/cli-command-groups.png)

To display help for `user` command group:

> node dist/apps/cli/main.js user -h

![CLI user command group](/doc/assets/cli-user-command-group.png)

To display all users :

> node dist/apps/cli/main.js user all

![CLI user command group](/doc/assets/cli-all-user-command.png)
