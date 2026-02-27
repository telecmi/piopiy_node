# Voice Transfer Pipeline Actions (One File Per Action)

Voice transfer uses the same PCMO pipeline action schema.
Each action has:
- a markdown doc (`*.md`) in this folder with options and descriptions
- a JavaScript file (`*.js`) under `example/voice_call/actions/` with a standalone example payload

## Files

- [param.md](param.md) / [`example/voice_call/actions/param.js`](../../../../example/voice_call/actions/param.js)
- [play.md](play.md) / [`example/voice_call/actions/play.js`](../../../../example/voice_call/actions/play.js)
- [play_get_input.md](play_get_input.md) / [`example/voice_call/actions/play_get_input.js`](../../../../example/voice_call/actions/play_get_input.js)
- [input.md](input.md) / [`example/voice_call/actions/input.js`](../../../../example/voice_call/actions/input.js)
- [record.md](record.md) / [`example/voice_call/actions/record.js`](../../../../example/voice_call/actions/record.js)
- [connect.md](connect.md) / [`example/voice_call/actions/connect.js`](../../../../example/voice_call/actions/connect.js)
- [hangup.md](hangup.md) / [`example/voice_call/actions/hangup.js`](../../../../example/voice_call/actions/hangup.js)
