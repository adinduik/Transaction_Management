
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
    

    cy.get(testData.usernameLocator).type(testData.tellerDetails[0])
    cy.get(testData.passwordLocator).type(testData.tellerDetails[1])
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
    


Cypress.Commands.add('initiateCashDepositSelfDeposit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).scrollIntoView().should('be.visible').click()
    cy.get(testData.accountOwnerNameLocator).scrollIntoView().should('be.visible').then(($accountOwner)=>{
        const accountOwnerText = $accountOwner.text().trim()
        cy.wrap(accountOwnerText).should('include', testData.accountOwnerName)
        
    })
    cy.get(testData.accountOwnerSelectorLocator).check().should('be.checked')
    cy.get(testData.depositAmountLocator).type(testData.belowLimitDepositAmount)
    cy.transactionBreakdown(testData.belowLimitAmountBreakdown)
    cy.wait(1000)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
     
})


Cypress.Commands.add('initiateCashDeposit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).scrollIntoView().should('be.visible').click()
    cy.get(testData.accountOwnerNameLocator).scrollIntoView().should('be.visible').then(($accountOwner)=>{
        const accountOwnerText = $accountOwner.text().trim()
        cy.wrap(accountOwnerText).should('include', testData.accountOwnerName)
        
    })
    cy.get(testData.accountOwnerSelectorLocatorNo).check().should('be.checked')
    cy.get(testData.depositorFirstNameLocator).type(testData.depositorFirstName)
    cy.get(testData.depositorLastNameLocator).type(testData.depositorLastName)
    cy.get(testData.depositorPhoneNumberLocator).type(testData.depositorPhoneNumber)
    cy.get(testData.depositAmountLocator).type(testData.belowLimitDepositAmount)
    cy.transactionBreakdown(testData.belowLimitAmountBreakdown)
    cy.wait(1000)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
     
})


Cypress.Commands.add('confirmCashDeposit', () => {
    
    cy.get(testData.confirmTransactionLocator).click()
    cy.get(testData.receiptLocator,{timeout: 30000}).scrollIntoView().should('be.visible')
        
})


Cypress.Commands.add('initiateCashDepositAboveLimitSelfDeposit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).scrollIntoView().should('be.visible').click()
    cy.get(testData.accountOwnerNameLocator).scrollIntoView().should('be.visible').then(($accountOwner)=>{
        const accountOwnerText = $accountOwner.text().trim()
        cy.wrap(accountOwnerText).should('include', testData.accountOwnerName)
        
    })
    cy.get(testData.accountOwnerSelectorLocator).check().should('be.checked')
    cy.get(testData.depositAmountLocator).type(testData.aboveLimitDepositAmount)
    cy.transactionBreakdown(testData.aboveLimitAmountBreakdown)
    cy.wait(1000)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
     
})


Cypress.Commands.add('initiateCashDepositAboveLimit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).scrollIntoView().should('be.visible').click()
    cy.get(testData.accountOwnerNameLocator).scrollIntoView().should('be.visible').then(($accountOwner)=>{
        const accountOwnerText = $accountOwner.text().trim()
        cy.wrap(accountOwnerText).should('include', testData.accountOwnerName)
        
    })
    cy.get(testData.accountOwnerSelectorLocatorNo).check().should('be.checked')
    cy.get(testData.depositorFirstNameLocator).type(testData.depositorFirstName)
    cy.get(testData.depositorLastNameLocator).type(testData.depositorLastName)
    cy.get(testData.depositorPhoneNumberLocator).type(testData.depositorPhoneNumber)
    cy.get(testData.depositAmountLocator).type(testData.aboveLimitDepositAmount)
    cy.transactionBreakdown(testData.aboveLimitAmountBreakdown)
    cy.wait(1000)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
     
})

Cypress.Commands.add('confirmCashDepositAboveLimit', () => {
    
    cy.get(testData.confirmTransactionLocator).click()
    cy.get(testData.approvalLocator,{timeout: 1000}).should('include.text', 'The amount exceeds allowed limit')
        
})


Cypress.Commands.add('transactionIdExtraction', () => {
    
    cy.get('div.modal-body.text-white.bg-danger.ng-star-inserted').then(($id)=>{

        const approvaltext = $id.text()
        var transactionIdtext = approvaltext.split(":")
        var transactionIdtext1 = transactionIdtext[1].trim()
        var transactionId2 = transactionIdtext1.split(" ")
        var transactionId = transactionId2[0].trim()


        cy.readFile('cypress/fixtures/testexample.json').then((data) => {
            const updatedData = {
              ...data,
              transactionID: transactionId,
            };
    
            cy.writeFile('cypress/fixtures/testexample.json', updatedData);
          })


    })
        
})


Cypress.Commands.add('selectCashDepositApproval', () => {

    cy.get(testData.approvalLimitLocator).click()
    cy.get(testData.cashDepositLimitLocator).click({force:true})
    cy.wait(2000)
        
})

Cypress.Commands.add('cashDepositDecline', () => {
    cy.readFile('cypress/fixtures/testexample.json').then((data) => {
      const transactionID = data.transactionID
      
  
      cy.get(testData.receiptNumberLocator).each(($row) => {
        
  
        cy.wrap($row).find('td:nth-child(3)').invoke('text').then((receiptnumbertext) => {
          const receiptnumber = receiptnumbertext.trim()
  
          if (receiptnumber === transactionID) {
            
  
            cy.wrap($row).find('td:nth-child(1) .btn.btn-primary.btn-sm').click({ force: true })
              cy.get(testData.confirmationModalTitleLocator, { timeout: 10000 })
                .should('be.visible')
                .and('contain.text', 'Transaction Details')
  
              cy.get(testData.declineButtonLocator).click()
              cy.get(testData.declineModalLocator).should('contain.text', 'Reason for decline')
              cy.get('div div div.card-body p.card-text textarea').type('ok')
              cy.get('a.btn.btn-primary.text-white').click()

    
          }
        });
      });
    });
  });

Cypress.Commands.add('cashDepositApproval', () => {

    cy.readFile('cypress/fixtures/testexample.json').then((data) => {
        const transactionID = data.transactionID
        

        cy.get(testData.receiptNumberLocator).each(($row)=>{

            cy.wrap($row).find('td:nth-child(3)').invoke('text').then((receiptnumbertext)=>{
            const receiptnumber = receiptnumbertext.trim()
            
    
                if(receiptnumber===transactionID){
    
                    
                    cy.wrap($row).find('td:nth-child(1) .btn.btn-primary.btn-sm').click({force:true})
                       
                    cy.get(testData.confirmationModalTitleLocator, {timeout: 10000}).should('be.visible').and('contain.text', 'Transaction Details')
                    cy.get(testData.approveButtonLocator).click()
                    cy.get(testData.receiptLocator,{timeout: 30000}).scrollIntoView().should('be.visible')
                    
                }
                
           })
        })
            

    })
  
        
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
