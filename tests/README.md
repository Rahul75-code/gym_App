# 🧪 FitForge Testing Suite

This directory contains the automated tests used to verify the core functionality of the FitForge Gym application before deployment.

## 📝 Test Overview

The primary test script `final-test.js` performs a "Full Lifecycle" check. It simulates a real user's journey to ensure that the connection between the Frontend, Backend, and Database is seamless.

### What is tested?
1. **User Registration**: Verifies that a user can be created in Supabase Auth and that a corresponding profile is automatically inserted into the `members` table.
2. **Profile Retrieval**: Ensures that the system can fetch the correct member profile using a `user_id`.
3. **Data Persistence**: Tests the ability to save a weight log entry in the `trackers` table and links it correctly to the member.
4. **Admin Visibility**: Confirms that the database allows the retrieval of the full member list (simulating the Admin Dashboard view).

---

## 🚀 How to Run the Tests

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed.
- Ensure your `.env.local` file is correctly configured with your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

### Steps to Execute
1. Open your terminal/command prompt.
2. Navigate to the project root directory.
3. Run the following command:

```bash
node tests/final-test.js
```

### 📊 Interpreting Results
- **`✅ SUCCESS`**: The feature is working as expected.
- **`❌ FAILED`**: There is a break in the logic or a database permission issue. Check the error message provided in the console for details.

---

## ⚠️ Important Note
This test script uses the `SUPABASE_SERVICE_ROLE_KEY` to bypass Row-Level Security (RLS) for verification purposes. **Never share this key or commit it to a public repository.**
