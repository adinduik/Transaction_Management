
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

//



let testData

before(function(){
    // Import data from testexample.json file

    cy.fixture('testexample').then(function(data){

        testData = data
    })
})

 Cypress.Commands.add('pagetitle', () => {
        cy.get('h1[class="ng-tns-c2-0"] strong[class="ng-tns-c2-0"]').then(($text)=>{

            expect($text.text()).to.eq('SLIPFREE-V2')
        })
    })


Cypress.Commands.add('pageLaunch', () => {
    cy.visit(Cypress.env('url')+'/login/')

    })
  

Cypress.Commands.add('tellerLogin', () => {
    

    cy.get(testData.usernameLocator).type(testData.tellerDetails[0])
    cy.get(testData.passwordLocator).type(testData.tellerDetails[1])
    cy.get(testData.tokenLocator).type(testData.tellerDetails[2])
    cy.get(testData.loginButtonLocator).click()
    cy.wait(1500)
    
    
})

Cypress.Commands.add('approverLogin', () => {
    

    cy.get(testData.usernameLocator).type(testData.approverDetails[0])
    cy.get(testData.passwordLocator).type(testData.approverDetails[1])
    cy.get(testData.tokenLocator).type(testData.approverDetails[2])
    cy.get(testData.loginButtonLocator).click()
    cy.wait(1500)
    
    
})


Cypress.Commands.add('logOut', () => {
    
    cy.get('.btn.btn-link.pl-2.pr-2').click({force:true})
    cy.url().should('include', '/login')
    cy.wait(2000)

    })

Cypress.Commands.add('userValidation', (username) => {
        var userfirstname = username.split(".")
        var userfirstname1 = userfirstname[0]

        var userlastname1 = userfirstname[1]
        


    cy.get(testData.nameLocator).then(($logintext)=>{
        expect($logintext.text().trim()).to.eq(userfirstname1 + ' ' + userlastname1)
       

    })
})



Cypress.Commands.add('tellerRoleValidation', () => {
    
    cy.get(testData.roleLocator).then(($role)=>{
        expect($role.text().trim()).to.eq('TELLER')
    })

    })



Cypress.Commands.add('approverRoleValidation', () => {
    
    cy.get(testData.roleLocator).then(($role)=>{
            expect($role.text()).to.include('CSM-D')
        })
    
       })
    


Cypress.Commands.add('selectCashDeposit', () => {
    
    cy.get(testData.cashDepositLocator).click({force:true})
        
})

Cypress.Commands.add('transactionBreakdown', (breakdown) => {
    
    cy.get('table:nth-child(1) tbody tr').each(($ele, index)=>{
        
        cy.wrap($ele).find('td:nth-child(2) input').type(breakdown[index])

        
    })
        
})
    


Cypress.Commands.add('initiateCashDeposit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).click()
    cy.get(testData.accountOwnerSelectorLocator).check().should('be.checked')
    cy.get(testData.depositAmountLocator).type(testData.belowLimitDepositAmount)
    cy.transactionBreakdown(testData.belowLimitAmountBreakdown)
    cy.wait(1000)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
     
})


Cypress.Commands.add('confirmCashDeposit', () => {
    
    cy.get(testData.confirmTransactionLocator).click()
    cy.get(testData.receiptLocator,{timeout: 30000}).scrollIntoView().should('be.visible')
        
})


Cypress.Commands.add('initiateCashDepositAboveLimit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).click()
    cy.get(testData.accountOwnerSelectorLocator).check().should('be.checked')
    cy.get(testData.depositAmountLocator).type(testData.aboveLimitDepositAmount)
    cy.transactionBreakdown(testData.aboveLimitAmountBreakdown)
    cy.wait(1000)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
     
})

Cypress.Commands.add('confirmCashDepositAboveLimit', () => {
    
    cy.get(testData.confirmTransactionLocator).click()
    cy.get(testData.approvalLocator,{timeout: 1000}).should('include.text', 'The amount exceeds allowed limit')
        
})



Cypress.Commands.add('getInstrumentDate', (instrumentDate) => {
            var instrumentDate = instrumentDate.split('\\')
            var instrumentyear = instrumentDate[0]
    
            var instmonth = instrumentDate[1]
           
            var instrumentDay = instrumentDate[2]

    
            cy.get('.sc-eeZoXJ').click()
            for(var i=0; i<2; i++){
            cy.get('.react-calendar__navigation__label').click()
            }
            cy.get('.react-calendar__decade-view__years__year').then(($decade)=>{
    
                const decadetext = $decade.first().text()
                var decade = parseInt(decadetext.substring(0, 4))
    
                while(Number(instrumentyear)<decade){
                    cy.get('.react-calendar__navigation__prev-button').click()
                    decade-=10
                }
            })
            cy.get('.react-calendar__decade-view__years__year').contains(instrumentyear).click()
            cy.get('.react-calendar__year-view__months__month').contains(instmonth).click()
            cy.contains('abbr', instrumentDay).click()
           
    
})



Cypress.Commands.add('totalvalidation', (newtotal) => {
    
    cy.get('div.sc-whCvt div.sc-mIVWJ .sc-eKxxib').then(($total)=>{

        const totaltext = $total.first().text()
        var sumtotaltext = totaltext.split(" ")
        var sumtotaltext = sumtotaltext[1].trim()
        var total = parseInt(sumtotaltext)

        expect(total).to.equal(Number(newtotal))


    })
        
})

Cypress.Commands.add('postingValidationbelowlimit', () => {
    
    cy.get('div p').each(($confirmationtext, index, $list)=>{

        if($confirmationtext.text().includes('I have read through all details displayed above and have ensured the information is accurate.')){

            cy.get('section div input[type="radio"]').click()
            cy.get('div.sc-jZSfwv button').click()
            cy.wait(2000)
        }
    })
        
})

Cypress.Commands.add('postingValidationabovelimit', () => {
    
    cy.get('div p').each(($confirmationtext, index, $list)=>{

        if($confirmationtext.text().includes('I have read through all details displayed above and have ensured the information is accurate.')){

            cy.get('section div input[type="radio"]').click()
            cy.get('div.sc-jZSfwv button').click()
            cy.wait(2000)
            cy.get('div.sc-dMGEXm div p').eq(1).should('have.text', 'Transaction sent for approval')
            cy.get('.sc-dzwvnd svg').click()
        }
    })
        
})


Cypress.Commands.add('selectApprovalTransaction', ($approvalamount) => {
    
    cy.get('tr td.sc-hJwLUj:nth-child(3)').each(($el, index, $list)=>{

        const approvalamounttext = $el.text()
        var apprAmount = approvalamounttext.replace(/,/g, '') 
                                            .replace(/NGN\s*/, ''); 
        var approvalAmount = parseInt(apprAmount, 10)
        

        if(approvalAmount===Number($approvalamount)){

            cy.get('button.sc-IFHok').eq(index).click({force:true})
        }


})
        
})

        
    


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
