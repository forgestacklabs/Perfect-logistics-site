# Quality Assurance & Security Documentation

This document outlines the current state of Quality Assurance (QA) practices and security measures such as rate limiting, load testing, and unit testing within the Perfect Logistics repository.

## Current Status (As of v0.1.1)

### 1. Rate Limiting
- **Status:** Implemented
- **Details:** Application-level rate limiting is configured using `lru-cache` in `lib/rate-limit.ts`. It is currently applied to the following API endpoints:
  - `GET /api/reviews` (100 reqs/min per IP)
  - `POST /api/reviews` (10 reqs/min per IP)
  - `GET /api/admin/reviews` (50 reqs/min per IP)

### 2. Load Testing
- **Status:** Implemented
- **Details:** Load testing is configured using Artillery. An `artillery.yml` file is present in the repository, defining scenarios for fetching and submitting reviews with varying loads.
- **Usage:** Run `npm run load-test` (Ensure the local development server is running on port 3000 before executing).

### 3. Unit Testing & Integration Testing
- **Status:** Implemented
- **Details:** The repository uses Vitest as its unit testing framework, integrated with React Testing Library (`@testing-library/react`) for component testing. An initial test has been added for `components/About.tsx`.
- **Usage:** Run `npm run test` to execute the test suite.

---
*Note: This document should be updated as new QA practices and security measures are introduced to the codebase.*
