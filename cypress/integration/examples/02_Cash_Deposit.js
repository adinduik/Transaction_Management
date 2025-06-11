let testData

describe("Cash Deposit Test Suite", function(){

    before(function(){
        // Import data from example.json file

        cy.fixture('testexample').then((data)=>{

            testData = data
        })
    })


    it("Cash Deposit Within Teller Limit", ()=>{
        cy.pageLaunch()
        cy.tellerLogin()
        cy.initiateCashDeposit()
        cy.confirmCashDeposit()



    })
    



})