let testData

describe("Cash Deposit Test Suite", function(){

    before(function(){
        // Import data from testexample.json file

        cy.fixture('testexample').then((data)=>{

            testData = data
        })
    })


    it("Cash Deposit Within Teller Limit - Self Deposit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.selectCashDeposit()
        cy.initiateCashDepositSelfDeposit()
        cy.confirmCashDeposit()
        cy.logOut()


    })


    it("Cash Deposit Within Teller Limit - Non-Self Deposit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.selectCashDeposit()
        cy.initiateCashDeposit()
        cy.confirmCashDeposit()
        cy.logOut()


    })


    it("Cash Deposit Above Teller Limit - Self Deposit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.selectCashDeposit()
        cy.initiateCashDepositAboveLimitSelfDeposit()
        cy.confirmCashDepositAboveLimit()
        cy.transactionIdExtraction()
        cy.logOut()


    })

    it("Transaction Approval", ()=>{
        cy.pageLaunch()
        cy.approverLogin()
        cy.selectCashDepositApproval()
        cy.cashDepositApproval()
        cy.logOut()


    })

    it("Cash Deposit Above Teller Limit - Non-Self Deposit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.selectCashDeposit()
        cy.initiateCashDepositAboveLimit()
        cy.confirmCashDepositAboveLimit()
        cy.transactionIdExtraction()
        cy.logOut()


    })
    

    it("Transaction Decline", ()=>{
        cy.pageLaunch()
        cy.approverLogin()
        cy.selectCashDepositApproval()
        cy.cashDepositDecline()
        cy.logOut()


    })


})