'use strict'

const showContacts = async () => {
	try {
		const contacts = document.getElementById('contacts')
		const url = 'http://localhost:8080/v1/whatsapp/data3/11987876567'
		const response = await fetch(url)
		const data = await response.json()
		const object = data.contatos
		console.log(data)

		object.forEach((item) => {
			const createContacts = document.createElement('div')
			const listContacts = document.createElement('h2')
			const imageProfile = document.createElement('img')
			imageProfile.src = '../img/teste.png'
			imageProfile.alt = 'profile image'
			imageProfile.classList.add('profile_image')

			listContacts.textContent = item.nome
			createContacts.appendChild(imageProfile)
			createContacts.appendChild(listContacts)
			contacts.appendChild(createContacts)
		})
	} catch (error) {
		alert('error internal server!')
		console.log(error)
	}
}

showContacts()
