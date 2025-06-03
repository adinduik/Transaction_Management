class CashDeposit{

    selectDeposits(){

        return cy.get('.sc-jwXWPX')
    }

    selectCashDeposit(){

        return cy.get('.sc-kpjZlD')
    }

    inputaccountNumber(){

        return cy.get('input[name="accountNumber"]')
    }

    selectaccountownerdepositor(){

        return cy.get('input[value="yes"]')
    }

    selectnonaccountownerdepositor(){

        return cy.get('input[value="no"]')
    }

    inputdepositorPhoneNumber(){

        return cy.get('input[name="phoneNumber"]')
    }

    clickCurrency(){

        return cy.get('.sc-hBYZlh').contains('Select Currency')
    }

    selectCurrency(){

        return cy.get('.sc-hMagqs')
    }

    clickDepositType(){

        return cy.get('.sc-hBYZlh').contains('Select Deposit Type')
    }

    selectDepositType(){

        return cy.get('.sc-hMagqs')
    }

    inputTransactionAmount(){

        return cy.get('input[name="amount"]')
    }

    inputremark(){

        return cy.get('textarea[name="remark"]')
    }


    inputnarration(){

        return cy.get('textarea[name="narration"]')
    }

    transactionbreakDown(){

        return cy.get('.sc-ljhsyB')
    }

    postTransaction(){

        return cy.get('button').contains('Post Transaction')
    }

    selectlimitapproval(){

        return cy.get('a[href="/limit-approval"]')
    }

    selectdepositlimit(){

        return cy.get('a[href="/limit-approval/deposit"]')
    }

    approvebutton(){

        return cy.get('.sc-ijCkoE button').contains('Approve')
    }

    approvalremark(){

        return cy.get('div.sc-kdMjkB input')
    }

    proceedApproval(){

        return cy.get('button').contains('Proceed')
    }

}

export default CashDeposit