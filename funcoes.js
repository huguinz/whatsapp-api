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
    if(idUser == item.number) {
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
        if(idUser == item.number) {
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
    let contacts = {}
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.number) {
            contacts.nome = item.account
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
            contacts.contatos = userData
        }
    })
    if(status == true) {
        return contacts
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
        if(idUser == item.number) {
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
        if(idUser == item.number) {
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
    let keyWordUser = String(keyWord).toUpperCase()
    let contactsData = {}
    let userData = []
    let status = false

    whatsappDataRequest.contatos['whats-users'].forEach((item) => {
        if(idUser == item.number)
            contactsData.nome = item.account
            item.contacts.forEach((contacts) => {
                if(nameContact == contacts.name.toUpperCase()) {
                    contactsData.contato = contacts.name
                    contacts.messages.forEach((messages) => {
                        if(messages.content.toUpperCase().includes(keyWordUser)) {
                            userData.push(
                                            {
                                                sender: messages.sender,
                                                content: messages.content,
                                                time: messages.time
                                            }
                                        )
                            status = true
                            contactsData.conversas_encontradas = userData
                        }
                    })
                }
            })

    })
    if(status == true) {
        return contactsData
    } else {
        return status
    }
}

//console.log(getPersonalDate(11987876567))
//console.log(getUserAccountData(11987876567))
//console.log(getContactsData(11987876567))
//console.log(getUserMessages(11966578996))
//console.log(getUserContacts(11966578996, 'José Maria da silva'))
//console.log(getKeyWord(11955577796, 'peter wilsen', 'co'))

module.exports = {
    getPersonalDate,
    getUserAccountData,
    getContactsData,
    getUserMessages,
    getUserContacts,
    getKeyWord
}