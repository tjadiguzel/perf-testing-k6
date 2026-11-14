# Performance Testing with k6

Smoke and load tests against the k6 public practice API.

## Run

    k6 run scripts/smoke.js
    k6 run scripts/load.js

## What's covered
- Smoke test: 1 virtual user, 10 seconds
- Load test: ramp to 10 virtual users with thresholds on error rate, p95 latency, and checks
