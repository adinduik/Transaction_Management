class Loginpage{

    inputUsername(){

        return cy.get('input[placeholder="Firstname.Lastname"]')
    }

    inputPassword(){

        return cy.get('input[placeholder="Password"]')
    }

    inputUserToken(){

        return cy.get('input[placeholder="Token"]')
    }

    passwordeye(){

        return cy.get('div.sc-lkRDuz svg').eq(0)
    }

    loginsubmit(){

        return cy.get('.btn.rounded-btn')
    }

    logout(){

        return cy.get('.sc-kRYBTm')
    }

}

export default Loginpage