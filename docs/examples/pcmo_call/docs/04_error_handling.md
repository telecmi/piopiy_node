# Error Handling

## What
Use structured catch logic for production-safe handling.

## Why
Separates validation errors, API/business errors, and network issues.

## Example

```javascript
try {
    const response = await client.pcmo.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        app_id: "your_app_id",
        pipeline: [{ action: "connect", params: { caller_id: "919999999999" }, endpoints: [] }]
    });
    console.log(response);
} catch (error) {
    if (error.response) {
        console.log("API failed:", error.response.status, error.response.data);
    } else if (error.request) {
        console.log("Network failed:", error.message);
    } else {
        console.log("Validation failed:", error.message);
    }
}
```

## Error Types

| Error Shape | Trigger | Action |
|---|---|---|
| validation `Error` | Local payload invalid. | Fix request parameters before retry. |
| axios `error.response` | API returned non-2xx. | Inspect HTTP status + payload. |
| axios `error.request` | Timeout/connection issue. | Retry with backoff and monitor transport. |
