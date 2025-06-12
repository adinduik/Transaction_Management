let testData

describe("Cash Deposit Test Suite", function(){

    before(function(){
        // Import data from testexample.json file

        cy.fixture('testexample').then((data)=>{

            testData = data
        })
    })


    it("Cash Deposit Within Teller Limit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.selectCashDeposit()
        cy.initiateCashDeposit()
        cy.confirmCashDeposit()
        cy.logOut()


    })


    it("Cash Deposit Above Teller Limit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.selectCashDeposit()
        cy.initiateCashDepositAboveLimit()
        cy.confirmCashDepositAboveLimit()
        cy.logOut()


    })
    



})