let testData;

describe ("Login Test Suite", function(){
    before(function(){
        // Import data from testexample.json file

        cy.fixture('testexample').then((data)=>{

            testData = data
        })
    })
   
    it ("Page Launch", ()=>{
            cy.visit(Cypress.env('url')+'/login/') // Launch Page
            cy.pagetitle() // Validate Page Title

    })

    it ("Teller Login", ()=>{
            cy.pageLaunch()
            cy.tellerLogin()
            cy.userValidation(testData.tellerDetails[0])
            cy.tellerRoleValidation()
            cy.logOut()

    })

    it("Approver Login", ()=>{

            cy.pageLaunch()
            cy.approverLogin()
            cy.userValidation(testData.approverDetails[0])
            cy.approverRoleValidation()
            cy.logOut()


    })

})