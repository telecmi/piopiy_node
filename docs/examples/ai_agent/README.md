# AI Agent Docs Index

This folder is split into small docs and single-purpose examples.

## Base Examples

- [01_client_setup.js](../../../example/ai_agent/01_client_setup.js)
- [02_ai_call_minimal.js](../../../example/ai_agent/02_ai_call_minimal.js)
- [03_ai_call_with_options.js](../../../example/ai_agent/03_ai_call_with_options.js)
- [04_ai_call_with_failover.js](../../../example/ai_agent/04_ai_call_with_failover.js)
- [05_ai_transfer_basic.js](../../../example/ai_agent/05_ai_transfer_basic.js)
- [06_ai_transfer_all_actions.js](../../../example/ai_agent/06_ai_transfer_all_actions.js)
- [07_ai_hangup_minimal.js](../../../example/ai_agent/07_ai_hangup_minimal.js)
- [08_ai_hangup_with_reason.js](../../../example/ai_agent/08_ai_hangup_with_reason.js)
- [09_ai_error_handling.js](../../../example/ai_agent/09_ai_error_handling.js)

## Topic Docs (Options + Description)

- [docs/README.md](docs/README.md)
- [docs/01_client_setup.md](docs/01_client_setup.md)
- [docs/02_ai_call.md](docs/02_ai_call.md)
- [docs/03_ai_call_failover.md](docs/03_ai_call_failover.md)
- [docs/04_ai_transfer.md](docs/04_ai_transfer.md)
- [docs/05_ai_hangup.md](docs/05_ai_hangup.md)
- [docs/06_error_handling.md](docs/06_error_handling.md)

## Action-by-Action Files

Each transfer pipeline action is split into its own doc and Node.js file:

- [actions/README.md](actions/README.md)
- [actions/param.md](actions/param.md) / [actions/param.js](../../../example/ai_agent/actions/param.js)
- [actions/play.md](actions/play.md) / [actions/play.js](../../../example/ai_agent/actions/play.js)
- [actions/play_get_input.md](actions/play_get_input.md) / [actions/play_get_input.js](../../../example/ai_agent/actions/play_get_input.js)
- [actions/input.md](actions/input.md) / [actions/input.js](../../../example/ai_agent/actions/input.js)
- [actions/record.md](actions/record.md) / [actions/record.js](../../../example/ai_agent/actions/record.js)
- [actions/connect.md](actions/connect.md) / [actions/connect.js](../../../example/ai_agent/actions/connect.js)
- [actions/hangup.md](actions/hangup.md) / [actions/hangup.js](../../../example/ai_agent/actions/hangup.js)

## Run

```bash
node example/ai_agent/02_ai_call_minimal.js
node example/ai_agent/actions/connect.js
```
