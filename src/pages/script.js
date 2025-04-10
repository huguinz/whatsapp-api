'use strict'

const nameContact = document.getElementById('search_contact')
const contacts = document.getElementById('contacts')
const inicial_screen = document.getElementById('inicial_screen')

const showContacts = async () => {
	try {
		const url = 'http://localhost:8080/v1/whatsapp/data3/11987876567'
		const response = await fetch(url)

		if (response.status === 200) {
			const data = await response.json()
			const object = data.contatos

			object.forEach((item) => {
				const createContacts = document.createElement('div')
				const listContacts = document.createElement('h2')
				const imageProfile = document.createElement('img')
				imageProfile.src = '../img/teste.png'
				imageProfile.alt = 'profile image'
				imageProfile.classList.add('profile_image')
				createContacts.setAttribute('data-name', item.nome)

				listContacts.textContent = item.nome
				createContacts.appendChild(imageProfile)
				createContacts.appendChild(listContacts)
				contacts.appendChild(createContacts)
			})
		} else {
			alert('erro ao buscar dados dos contatos!')
		}
	} catch (error) {
		console.log(error)
		alert('error internal server!!')
	}
}

showContacts()

const searchContacts = async (name) => {
	const url = `http://localhost:8080/v1/whatsapp/filtro/?numero=11987876567&contato=${name}`
	const response = await fetch(url)

	if (response.status === 200) {
		const data = await response.json()
		contacts.replaceChildren('')
		data.contato.forEach((item) => {
			const createContacts = document.createElement('div')
			const listContacts = document.createElement('h2')
			const imageProfile = document.createElement('img')
			imageProfile.src = '../img/teste.png'
			imageProfile.alt = 'profile image'
			imageProfile.classList.add('profile_image')

			listContacts.textContent = item.nome_contato
			createContacts.appendChild(imageProfile)
			createContacts.appendChild(listContacts)
			contacts.appendChild(createContacts)
		})
	} else {
		console.log('usuario não encontrado')
	}
}

nameContact.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') {
		return searchContacts(nameContact.value)
	}
})

const showChatsContacts = async (name) => {
	const url = `http://localhost:8080/v1/whatsapp/filtro/?numero=11987876567&contato=${name}`
	const response = await fetch(url)
	const data = await response.json()

	if (response.status === 200 && data.contato.length === 1) {
		inicial_screen.replaceChildren('')
		inicial_screen.style.backgroundColor = 'red'

		data.contato.forEach((item) => {
			item.mensagens.forEach((messages) => {
				console.log(messages)
				const contentMe = document.createElement('div')
				const contentChatsMe = document.createElement('p')
				const talkTimeMe = document.createElement('p')

				const contentContact = document.createElement('div')
				const contentChatsContact = document.createElement('p')
				const talkTimeContact = document.createElement('p')

				contentMe.classList.add('messages', 'sender_me')
				contentContact.classList.add('messages', 'sender_contact')

				if (messages.sender == 'me') {
					contentChatsMe.textContent = messages.content
					talkTimeMe.textContent = messages.time
					contentMe.appendChild(contentChatsMe)
					contentMe.appendChild(talkTimeMe)
					inicial_screen.appendChild(contentMe)
				} else {
					contentChatsContact.textContent = messages.content
					talkTimeContact.textContent = messages.time
					contentContact.appendChild(contentChatsContact)
					contentContact.appendChild(talkTimeContact)
					inicial_screen.appendChild(contentContact)
				}
			})
		})
	} else {
		alert('não foi possível acessar as conversas com este usuario!')
	}
}

contacts.addEventListener('click', (event) => {
	const executeShowChatsContacts = event.target.getAttribute('data-name')
	showChatsContacts(executeShowChatsContacts)
})
