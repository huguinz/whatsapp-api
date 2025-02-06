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

const getUserMessages = (id) => {
    let idUser = Number(id)
    let userData = []
    let userMessages = []
    let userChats = {}
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.id) {
            userChats.nome = item.account
            userChats.contatos = userMessages
            item.contacts.forEach((contacts) => {
                userMessages.push(
                                    {
                                        nome: contacts.name, 
                                        conversas: userData
                                    }
                                )
                contacts.messages.forEach((messagesContacts) => {
                        userData.push(
                                            {
                                                sender: messagesContacts.sender,
                                                content: messagesContacts.content,
                                                time: messagesContacts.time
                                            }
                                    )
                })
            }) 
            status = true
        }
    })
    if(status == true) {
        return userChats
    } else {
        return status
    }
}

const getUserContacts = (id, name) => {
    let idUser = Number(id)
    let nameContact = String(name).toUpperCase()
    let contactsData = {}
    let userData = []
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.id) {
            contactsData.nome = item.account
            item.contacts.forEach((contacts) => {
                if(nameContact == contacts.name.toUpperCase()) {
                    contactsData.contato = contacts.name
                    contacts.messages.forEach((messagesContacts) => {
                        userData.push(
                                        {
                                            sender: messagesContacts.sender,
                                            content: messagesContacts.content,
                                            time: messagesContacts.time  
                                        }
                                     )
                    })
                    status = true
                    contactsData.mensagens = userData
                }
            })
        }
    })
    if(status == true) {
        return contactsData
    } else {
        return status
    }
}

const getKeyWord = (id, name, keyWord) => {
    let idUser = Number(id)
    let nameContact = String(name).toUpperCase()
    let keywordUser = String(keyWord).toUpperCase()
    let contactsData = {}
    let userData = []
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.id) {
            contactsData.nome = item.account
            item.contacts.forEach((contacts) => {
                if(nameContact == contacts.name.toUpperCase()) {
                    contactsData.contato = contacts.name
                    contacts.messages.forEach((messagesContacts) => {
                        if(String(messagesContacts.content).toUpperCase().includes(keywordUser)) {
                            userData.push(contactsData)
                        }
                    })
                    status = true
                    contactsData.mensagens = userData
                }
            })
        }
    })
    console.log(contactsData.mensagens)
    if(status == true) {
        return contactsData
    } else {
        return status
    }
}

//console.log(getPersonalDate(1))
//console.log(getUserAccountData(4))
//console.log(getContactsData(1))
//console.log(getUserMessages(3))
//console.log(getUserContacts(1, 'julia smith')
//console.log(getKeyWord(1, 'ana maria', 'asking'))

module.exports = {
    getPersonalDate,
    getUserAccountData,
    getContactsData,
    getUserMessages,
    getUserContacts,
    getKeyWord
}