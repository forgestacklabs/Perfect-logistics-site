# Project Documentation

## Features implemented

### Rate Limiting
- Rate limiting implemented on the `/api/reviews` POST route to prevent spam and abuse.
- Utilizes `lru-cache` to track the number of requests per IP address.
- Configured to allow a maximum of 5 requests per minute per IP address. Exceeding this limit results in a `429 Too Many Requests` status code.

### Unit Tests
- Unit tests written using `vitest` to verify the functionality of the `/api/reviews` route.
- Tests cover the following scenarios:
  - Returning a 400 status code when required fields are missing during a POST request.
  - Returning a 201 status code on a successful POST request with valid payload.
  - Ensuring the rate limit (429 status code) is enforced after 5 successful requests from the same IP within a minute.

### Integration Tests
- Playwright integration tests verify that the `/api/reviews` endpoints operate correctly without errors (simulating real request flow context).
- Test covers the overall success response behavior on valid endpoint usage or appropriate error fallback for the mocked API integrations.

### UI Tests
- Playwright UI tests verify that key frontend pages are correctly loaded.
- Ensure the root page (`/`) loads successfully and displays the critical body/hero elements.

### Load Tests
- Performed using `autocannon` targeting the `/api/reviews` GET endpoint.
- Conducted with 10 concurrent connections for 10 seconds.
- Results summarized below:
  - Average Latency: ~26.78 ms
  - Average Requests/Sec: ~366.1

## Load Test Results Detailed

```
Running 10s test @ http://localhost:3000/api/reviews
10 connections

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼────────┤
│ Latency │ 20 ms │ 25 ms │ 40 ms │ 46 ms │ 26.78 ms │ 9.47 ms │ 228 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬────────┬────────┬────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Req/Sec   │ 228     │ 228     │ 371    │ 461    │ 366.1  │ 59.15   │ 228     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Bytes/Sec │ 71.9 kB │ 71.9 kB │ 117 kB │ 145 kB │ 115 kB │ 18.6 kB │ 71.8 kB │
└───────────┴─────────┴─────────┴────────┴────────┴────────┴─────────┴─────────┘
```
