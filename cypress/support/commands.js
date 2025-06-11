
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

import LoginPage from '../integration/PageObjects/Loginpage.js'

let testData

before(function(){
    // Import data from example.json file

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
    const loginpage = new LoginPage()

    cy.get(testData.usernameLocator).type(testData.tellerDetails[0])
    cy.get(testData.passwordLocator).type(testData.tellerDetails[1])
    cy.get(testData.tokenLocator).type(testData.tellerDetails[2])
    cy.get(testData.loginButtonLocator).click()
    cy.wait(3000)
    
    
})

Cypress.Commands.add('approverLogin', () => {
    const loginpage = new LoginPage()

    cy.get(testData.usernameLocator).type(testData.approverDetails[0])
    cy.get(testData.passwordLocator).type(testData.approverDetails[1])
    cy.get(testData.tokenLocator).type(testData.approverDetails[2])
    cy.get(testData.loginButtonLocator).click()
    cy.wait(3000)
    
    
})


Cypress.Commands.add('logOut', () => {
    
    cy.get('.btn.btn-link.pl-2.pr-2').click()
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

Cypress.Commands.add('transactionBreakdown', (tranbreakdown) => {
    
    cy.get('table tbody[class="ng-tns-c13-29 ng-star-inserted"]:nth-child(2) tr').each(($el, index, $list)=>{

        var denomination = $el.find('td:nth-child(1)').text()

        if(denomination==='1000'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[0])
        }

        else if (denomination==='500'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[1])
        }

        else if (denomination==='200'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[2])
        }

        else if (denomination==='100'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[3])
        }

        else if (denomination==='50'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[4])
        }

        else if (denomination==='20'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[5])
        }

        else if (denomination==='10'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[6])
        }

        else if (denomination==='5'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[7])
        }
        
        else if (denomination==='1'){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[8])
        }

        else if (denomination.contains('kobo/pence/cent')){

            cy.get('td:nth-child(2) input').eq(index).type(tranbreakdown[9])
        }
    })
        
})
    


Cypress.Commands.add('initiateCashDeposit', () => {
    
    cy.get(testData.depositAccountNumberLocator).type(testData.depositAccountNumber)
    cy.get(testData.accountNumberValidatorLocator).click()
    cy.get(testData.accountOwnerSelectorLocator).select()
    cy.get(testData.depositAmountLocator).type(testData.belowLimitDepositAmount)
    cy.transactionBreakdown(testData.belowLimitAmountBreakdown)
    cy.get(testData.postTransactionLocator).contains(' Post Transaction ').click()
        
})


Cypress.Commands.add('confirmCashDeposit', () => {
    
    cy.get(testData.confirmTransactionLocator).click()
    
        
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
