import Loginpage from "../PageObjects/Loginpage"
import CashDeposit from "../PageObjects/CashDeposit"

Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error
    console.error('An uncaught exception occurred:', err);
  
    // Continue the test without failing
    return false;
  });




describe("Cash Deposit Test Suite", function(){

    before(()=>{
        // Import data from example.json file

        cy.fixture('example').then((data)=>{

            this.data = data
        })
    })


    it("Cash Deposit Within Teller Limit", ()=>{
        const loginpage = new Loginpage()
        const deposit = new CashDeposit()

        

        cy.tellerLogin()
        cy.wait(3000)
        cy.uservalidation(this.data.tellerdetails[0]) // Validate Teller Name
        cy.tellerRolevalidation()
        deposit.selectDeposits().eq(1).click({force:true})
        deposit.selectCashDeposit().click()
        deposit.inputaccountNumber().type(this.data.accountNumber)
        cy.wait(1500)
        deposit.selectaccountownerdepositor().check()
        deposit.inputdepositorPhoneNumber().type(this.data.phoneNumber)
        deposit.clickCurrency().click()
        deposit.selectCurrency().contains(this.data.currency).click()
        deposit.clickDepositType().click()
        deposit.selectDepositType().contains(this.data.depositType).click()
        cy.getInstrumentDate(this.data.transactionDate)
        deposit.inputTransactionAmount().clear()
        deposit.inputTransactionAmount().type(this.data.belowlimittransactionAmount)
        deposit.inputremark().type(this.data.remark)
        deposit.inputnarration().type(this.data.narration)
        cy.transactionBreakdown(this.data.belowlimitamountbreakdown)
        cy.totalvalidation(this.data.belowlimittransactionAmount)
        deposit.postTransaction().click()
        cy.postingValidationbelowlimit()
      

        loginpage.logout().click()
        cy.wait(1000)
    })

    it("Cash Deposit Above Test Limit", ()=>{
        const loginpage = new Loginpage()
        const deposit = new CashDeposit()

        

        cy.tellerLogin()
        cy.wait(3000)
        cy.uservalidation(this.data.tellerdetails[0]) // Validate Teller Name
        cy.tellerRolevalidation()
        deposit.selectDeposits().eq(1).click({force:true})
        deposit.selectCashDeposit().click()
        deposit.inputaccountNumber().type(this.data.accountNumber)
        cy.wait(1500)
        deposit.selectaccountownerdepositor().check()
        deposit.inputdepositorPhoneNumber().type(this.data.phoneNumber)
        deposit.clickCurrency().click()
        deposit.selectCurrency().contains(this.data.currency).click()
        deposit.clickDepositType().click()
        deposit.selectDepositType().contains(this.data.depositType).click()
        cy.getInstrumentDate(this.data.transactionDate)
        deposit.inputTransactionAmount().clear()
        deposit.inputTransactionAmount().type(this.data.abovelimittransactionAmount)
        deposit.inputremark().type(this.data.remark)
        deposit.inputnarration().type(this.data.narration)
        cy.transactionBreakdown(this.data.abovelimitamountbreakdown)
        cy.totalvalidation(this.data.abovelimittransactionAmount)
        deposit.postTransaction().click()
        cy.postingValidationabovelimit()
      

        loginpage.logout().click()
        cy.wait(1000)
    })


    it("Deposit Approval", ()=>{
        const loginpage = new Loginpage()
        const deposit = new CashDeposit()

        

        cy.approverLogin()
        cy.wait(3000)
        cy.uservalidation(this.data.approverdetails[0]) // Validate Teller Name
        cy.approverRolevalidation()
        deposit.selectlimitapproval().click()
        deposit.selectdepositlimit().click()
        cy.wait(2000)
        cy.selectApprovalTransaction(this.data.abovelimittransactionAmount)
        
        deposit.approvebutton().click()
        deposit.approvalremark().type(this.data.transactionapprovalremark)
        deposit.proceedApproval().click()
        
      

        loginpage.logout().click()
        cy.wait(1000)
    })


})