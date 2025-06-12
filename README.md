# SlipFree Automation Test Suite

This project contains automated tests for the **SlipFree** application using Cypress. The tests are designed to validate key functionalities such as user login, role validation, cash deposit workflows, and transaction approval processes.

---

## Project Overview

The SlipFree application is a financial platform that facilitates cash deposit transactions. This test suite ensures that the application behaves as expected under various scenarios, including deposits within and above teller limits.

### Key Features Tested:
1. **User Authentication**:
   - Teller and Approver login workflows.
   - Validation of user roles after login.

2. **Cash Deposit Transactions**:
   - Deposits within teller limits.
   - Deposits exceeding teller limits (requiring approval).

3. **Transaction Breakdown**:
   - Validation of denomination breakdown during cash deposits.

4. **Approval Workflow**:
   - Handling transactions that exceed teller limits and require approver validation.

---

## Project Structure

### Key Files and Directories:
- **`cypress/fixtures/testexample.json`**:
  Contains test data such as locators, user credentials, and transaction details.

- **`cypress/integration/examples/02_Cash_Deposit.js`**:
  Contains test cases for cash deposit workflows.

- **`cypress/support/commands.js`**:
  Contains custom Cypress commands to simplify and reuse test logic.

---

## Test Data

The test data is stored in the `testexample.json` file and includes:

### Locators:
- **`usernameLocator`**: Locator for the username input field.
- **`passwordLocator`**: Locator for the password input field.
- **`tokenLocator`**: Locator for the token input field.
- **`loginButtonLocator`**: Locator for the login button.
- **`cashDepositLocator`**: Locator for the cash deposit navigation link.
- **`depositAccountNumberLocator`**: Locator for the account number input field.
- **`depositAmountLocator`**: Locator for the deposit amount input field.

### User Credentials:
- **`tellerDetails`**: Credentials for the teller user.
- **`approverDetails`**: Credentials for the approver user.

### Transaction Details:
- **`depositAccountNumber`**: Account number used for deposits.
- **`belowLimitDepositAmount`**: Deposit amount within the teller limit.
- **`belowLimitAmountBreakdown`**: Denomination breakdown for deposits within the teller limit.
- **`aboveLimitDepositAmount`**: Deposit amount exceeding the teller limit.
- **`aboveLimitAmountBreakdown`**: Denomination breakdown for deposits exceeding the teller limit.

---

## Test Cases

### 1. **Cash Deposit Within Teller Limit**
- **Steps**:
  1. Launch the application.
  2. Log in as a teller.
  3. Navigate to the cash deposit page.
  4. Enter account details and deposit amount within the teller limit.
  5. Confirm the transaction.
  6. Validate the success message and receipt.

- **Expected Outcome**:
  - The transaction is successfully processed, and a receipt is displayed.

---

### 2. **Cash Deposit Above Teller Limit**
- **Steps**:
  1. Launch the application.
  2. Log in as a teller.
  3. Navigate to the cash deposit page.
  4. Enter account details and deposit amount exceeding the teller limit.
  5. Confirm the transaction.
  6. Validate the error message indicating the transaction requires approval.

- **Expected Outcome**:
  - The transaction is flagged for approval, and the appropriate error message is displayed.

---

## Custom Commands

The `commands.js` file contains reusable Cypress commands to simplify test logic. Below are some key commands:

### Login Commands:
- **`cy.login(username, password, token)`**:
  Logs in a user with the provided credentials.
- **`cy.tellerLogin()`**:
  Logs in as a teller using credentials from the fixture file.
- **`cy.approverLogin()`**:
  Logs in as an approver using credentials from the fixture file.

### Cash Deposit Commands:
- **`cy.selectCashDeposit()`**:
  Navigates to the cash deposit page.
- **`cy.initiateCashDeposit(accountNumber, depositAmount, breakdown)`**:
  Initiates a cash deposit with the provided account number, amount, and denomination breakdown.
- **`cy.confirmCashDeposit()`**:
  Confirms the cash deposit transaction.
- **`cy.confirmCashDepositAboveLimit()`**:
  Validates transactions exceeding the teller limit.

### Validation Commands:
- **`cy.validateRole(expectedRole)`**:
  Validates the logged-in user's role.
- **`cy.validateTotal(expectedTotal)`**:
  Validates the total amount displayed on the screen.
- **`cy.validatePosting(isAboveLimit)`**:
  Validates the posting process for transactions.

---

## How to Run the Tests

### Prerequisites:
1. Install [Node.js](https://nodejs.org/).
2. Install Cypress:
   ```bash
   npm install cypress --save-dev
