# loopback-admin-tools

Administration scripts and tools for LoopBack related projects.

## Usage

> Until we publish this module to NPM, you can clone this repo locally and run
`npm link` instead of `npm install -g loopback-admin-tools` to use this module.

1. Install this module globally (`npm install -g loopback-admin-tools`) to get
   a set of LoopBack administration related commands.
1. Run a command (ie. `lat-owners` will generate `owners.md` in the current
   dir).

## Commands

### `lat-owners`

Generate `owners.md` in the **current working directory** using the list from [`loopback-owners`](//github.com/strongloop/loopback-owners/blob/master/index.js).

> `owners.md` is a list of repository owners based on functional areas (ie.
> Connectors, Juggler, Remoting, etc).
