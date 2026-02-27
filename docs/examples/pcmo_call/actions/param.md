# Action: param

## What
Set key/value metadata inside pipeline.

## Why
Carry context across flow steps and callbacks.

## Options

| Field | Description | Why |
|---|---|---|
| `data` | Map of key-value pairs. | Pass contextual values for downstream logic. |

## Constraints

- Max 10 keys
- Key regex: `^[A-Za-z_][A-Za-z0-9_]*$`
- Value types: `string(max 256)`, `number`, `boolean`

## Example

```javascript
const action = {
    action: "param",
    data: { customer_id: "CUST-1001", is_vip: true, score: 95 }
};
console.log(action);
```
