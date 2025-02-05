/* *********************************************************************
* Objetivo: Criar um total de 6 funções para uma API futura solicitada por uma escola/
* Data: 03/02/2025
* Autor: Hugo Lopes
* Versão: 1.0
**********************************************************************/

var whatsappDataRequest = require('./contatos')

const getPersonalDate = function(id) {
    let idUser = Number(id)
    let userData = []
    let status = false

   whatsappDataRequest.contatos['whats-users'].forEach((item) => {
    if(idUser === item.id) {
        userData.push(
                        {
                            account: item.account,
                            created_since: {start: item['created-since'].start, end: item['created-since'].end},
                            number: item.number
                        }
                    )
        status = true
    }
   })
   if(status == true) {
    return userData
   } else {
    return status
   }
}

const getUserAccountData = (id) => {
    let idUser = Number(id)
    let userData = []
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.id) {
            userData.push(
                            {
                                nickname: item.nickname,
                                foto: item['profile-image'],
                                background: item.background
                            }
                        )
            status = true
        }
    })
    if(status == true) {
        return userData
    } else {
        return status
    }
}

const getContactsData = (id) => {
    let idUser = Number(id)
    let userData = []
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.id) {
            item.contacts.forEach((ctData) => {
                userData.push(
                                {
                                    nome: ctData.name,
                                    descricao: ctData.description,
                                    imagem: ctData.image
                                }
                            )
            })
            status = true
        }
    })
    if(status == true) {
        return userData
    } else {
        return status
    }
}

//console.log(getPersonalDate(1))
//console.log(getUserAccountData(4))
//console.log(getContactsData(1))