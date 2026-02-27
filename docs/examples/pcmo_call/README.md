# PCMO Call Docs Index

This folder is split into small docs and single-purpose examples for `pcmo.call` and `pcmo.transfer`.

## Base Examples

- [01_client_setup.js](../../../example/pcmo_call/01_client_setup.js)
- [02_pcmo_call_minimal.js](../../../example/pcmo_call/02_pcmo_call_minimal.js)
- [03_pcmo_call_all_actions.js](../../../example/pcmo_call/03_pcmo_call_all_actions.js)
- [04_pcmo_transfer_basic.js](../../../example/pcmo_call/04_pcmo_transfer_basic.js)
- [05_pcmo_transfer_all_actions.js](../../../example/pcmo_call/05_pcmo_transfer_all_actions.js)
- [06_pcmo_error_handling.js](../../../example/pcmo_call/06_pcmo_error_handling.js)

## Topic Docs (Options + Description)

- [docs/README.md](docs/README.md)
- [docs/01_client_setup.md](docs/01_client_setup.md)
- [docs/02_pcmo_call.md](docs/02_pcmo_call.md)
- [docs/03_pcmo_transfer.md](docs/03_pcmo_transfer.md)
- [docs/04_error_handling.md](docs/04_error_handling.md)

## Action-by-Action Files

Each PCMO pipeline action is split into its own doc and JavaScript file:

- [actions/README.md](actions/README.md)
- [actions/param.md](actions/param.md) / [actions/param.js](../../../example/pcmo_call/actions/param.js)
- [actions/play.md](actions/play.md) / [actions/play.js](../../../example/pcmo_call/actions/play.js)
- [actions/play_get_input.md](actions/play_get_input.md) / [actions/play_get_input.js](../../../example/pcmo_call/actions/play_get_input.js)
- [actions/input.md](actions/input.md) / [actions/input.js](../../../example/pcmo_call/actions/input.js)
- [actions/record.md](actions/record.md) / [actions/record.js](../../../example/pcmo_call/actions/record.js)
- [actions/connect.md](actions/connect.md) / [actions/connect.js](../../../example/pcmo_call/actions/connect.js)
- [actions/hangup.md](actions/hangup.md) / [actions/hangup.js](../../../example/pcmo_call/actions/hangup.js)

## Run

```bash
node example/pcmo_call/02_pcmo_call_minimal.js
node example/pcmo_call/actions/connect.js
```
