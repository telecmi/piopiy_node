# Voice Call Docs Index

This folder is split into small docs and single-purpose examples for the voice convenience surface:

- `client.voice.call(...)`
- `client.voice.transfer(...)`
- `client.voice.hangup(...)`

## Base Examples

- [01_voice_call_direct.js](../../../example/voice_call/01_voice_call_direct.js)
- [02_voice_transfer_direct.js](../../../example/voice_call/02_voice_transfer_direct.js)
- [03_voice_hangup_direct.js](../../../example/voice_call/03_voice_hangup_direct.js)
- [04_voice_error_handling.js](../../../example/voice_call/04_voice_error_handling.js)

## Topic Docs (Options + Description)

- [docs/README.md](docs/README.md)
- [docs/01_client_setup.md](docs/01_client_setup.md)
- [docs/02_voice_call.md](docs/02_voice_call.md)
- [docs/03_voice_transfer.md](docs/03_voice_transfer.md)
- [docs/04_voice_hangup.md](docs/04_voice_hangup.md)
- [docs/05_error_handling.md](docs/05_error_handling.md)

## Action-by-Action Files

Voice transfer uses the same PCMO pipeline action schema. Each action has a dedicated doc and JavaScript example:

- [actions/README.md](actions/README.md)
- [actions/param.md](actions/param.md) / [actions/param.js](../../../example/voice_call/actions/param.js)
- [actions/play.md](actions/play.md) / [actions/play.js](../../../example/voice_call/actions/play.js)
- [actions/play_get_input.md](actions/play_get_input.md) / [actions/play_get_input.js](../../../example/voice_call/actions/play_get_input.js)
- [actions/input.md](actions/input.md) / [actions/input.js](../../../example/voice_call/actions/input.js)
- [actions/record.md](actions/record.md) / [actions/record.js](../../../example/voice_call/actions/record.js)
- [actions/connect.md](actions/connect.md) / [actions/connect.js](../../../example/voice_call/actions/connect.js)
- [actions/hangup.md](actions/hangup.md) / [actions/hangup.js](../../../example/voice_call/actions/hangup.js)

## Run

```bash
node example/voice_call/01_voice_call_direct.js
node example/voice_call/02_voice_transfer_direct.js
node example/voice_call/actions/connect.js
```
