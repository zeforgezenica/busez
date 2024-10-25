# Test Documentation

This document describes how to install, run, and understand the test cases for the Agency, city, country, Email, Route and station controllers in this repository. The tests are written using Jest and Supertest to ensure the API endpoints function as expected.
 
## Installation and Rnunning

1. **Navigate to Backend:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Run Test:**

    ```bash
    pnpm test
    ```
    

## Test Structure

1. **Setup and Teardown:**

    Each test file uses beforeEach() to initialize mock data and mocks functions like fs.readFile and fs.writeFile for simulating file operations. After each test, jest.clearAllMocks() ensures that no state leaks between tests.

2. **Mocking File System:**
    The file system’s read and write operations are mocked using jest.mock('fs'), allowing the tests to simulate reading from and writing to JSON files without actual file operations.

3. **Supertest:**
    The Supertest library is used to simulate HTTP requests to the Express routes, checking response status codes, JSON structures, and error messages.