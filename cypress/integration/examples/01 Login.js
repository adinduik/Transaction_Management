
import LoginPage from '../PageObjects/Loginpage'

let ele;

describe ("Login Test Suite", function(){
    before(function(){
        // Import data from example.json file

        cy.fixture('example').then((data)=>{

            ele = data
        })
    })
   
    it ("Page Launch", ()=>{
            cy.visit(Cypress.env('url')+'/login/') // Launch Page
            cy.pagetitle() // Validate Page Title

    })

    it("Teller Login", ()=>{
        const loginpage = new LoginPage() // Create instance of Page objects stored on Loginpage.js

        cy.visit(Cypress.env('url')+'/login/') // Launch Page

        loginpage.inputUsername().type(testData.tellerdetails[0]) // Input Username
        loginpage.inputPassword().type(testData.tellerdetails[1]) // Input Password
        loginpage.inputUserToken().type(testData.token) // Input Token
        loginpage.loginsubmit().click() // Login
        cy.wait(10000)
        cy.uservalidation(testData.tellerdetails[0]) // Validate Teller Name
        cy.tellerRolevalidation() // Validate Role
        loginpage.logout().click() // Logout
        cy.wait(1000)
                
    })


    it("Approver Login", ()=>{
        const loginpage = new LoginPage()

        cy.visit(Cypress.env('url')+'/login/') // Launch Page

        loginpage.inputUsername().type(this.data.approverdetails[0]) // Input Username
        loginpage.inputPassword().type(this.data.approverdetails[1]) // Input Password
        loginpage.inputUserToken().type(this.data.token) // Input Token
        loginpage.loginsubmit().click()
        cy.wait(10000)
        cy.uservalidation(this.data.approverdetails[0]) // Validate Approver Name
        cy.approverRolevalidation() // Validate Role
        loginpage.logout().click() // Logout
        cy.wait(2000)
        
    })

    it("Admin Login", ()=>{
        const loginpage = new LoginPage()

        cy.visit(Cypress.env('url')+'/login/') // Launch Page

        loginpage.inputUsername().type(this.data.admindetails[0]) // Input Username
        loginpage.inputPassword().type(this.data.admindetails[1]) // Input Password
        loginpage.inputUserToken().type(this.data.token) // Input Token
        loginpage.loginsubmit().click()
        cy.wait(10000)
        cy.uservalidation(this.data.admindetails[0]) // Validate Approver Name
        cy.adminRolevalidation() // Validate Role
        loginpage.logout().click() // Logout
        cy.wait(1000)
        
        
    })

    it("Password Eye", ()=>{
        const loginpage = new LoginPage()

        cy.visit(Cypress.env('url')+'/login/') // Launch Page

        loginpage.inputUsername().type(this.data.admindetails[0]) // Input Username
        loginpage.inputPassword().type(this.data.admindetails[1]) // Input Password
        loginpage.inputPassword().should('have.attr', 'type', 'password')
        loginpage.passwordeye().click()
        loginpage.inputPassword().should('have.attr', 'type', 'text')
        
    })

})
