import { contactService } from "../services/contact.service.js"


export const contactStore = {
    state: {
        contacts: [],
        lastRemovedContact: null

    },
    getters: {
        contacts({ contacts }) {
            return contacts
        },
    },
    mutations: {
        setContacts(state, { contacts }) {
            // console.log('payload: ', payload)
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(p => p._id === contactId)
            state.lastRemovedContact = state.contacts[idx]
            state.contacts.splice(idx, 1)
        },
        addContact(state, { contact }) {
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(p => p._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },
        clearRemoveContact(state) {
            state.lastRemovedContact = null
        },
        undoRemoveContact(state) {
            state.contacts.unshift(state.lastRemovedContact)
            state.lastRemovedContact = null
        },

    },
    actions: {
        async loadContacts({ commit }, payload) {
            try {
                // if(contactStore.state.contacts.length) return
                    // commit({ type: 'setContacts', state.contacts })
                // else {
                    const contacts = await contactService.getContacts(payload?.filterBy)
                    // {...contacts}
                    commit({ type: 'setContacts', contacts })
                // }
            } catch (err) {
                console.log('err:', err)
            }
        },
        async removeContact({ commit }, payload) {
            commit(payload)
            try {
                await contactService.deleteContact(payload.contactId)
                commit({ type: 'clearRemoveContact' })
            } catch (err) {
                commit({ type: 'undoRemoveContact' })
                throw err
            }
        },
        async saveContact({ commit }, { contact }) {
            const actionType = (contact._id) ? 'updateContact' : 'addContact'
            try {
                const savedContact = await contactService.saveContact(contact)
                // Adds everything twice here because 
                // contactService updates contacts hard coded in service
                // and then it loads the contacts in index from service (and sets them in store)
                // and then in save contacts it adds to the store contacts the contact 
                // (which has already been added to store because of load)
                // SO I PUT THIS IN COMMENT FOR NOW : 
                commit({ type: actionType, contact: savedContact })
                return savedContact
            } catch (err) {
                console.log('err:', err)
            }

        },
    }
}