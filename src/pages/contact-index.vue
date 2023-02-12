<template>
    <div class="main-container">
        <UserMsg />
        <ContactFilter @filter="onSetFilterBy" />
        <ContactList @remove="removeContact" v-if="contacts" :contacts="filteredContacts" />
        <!-- <RouterLink to="/contact/edit"><button>Add a Contact</button></RouterLink> -->
    </div>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { eventBus } from '@/services/eventBus.service.js'

import ContactList from '@/cmps/contact-list.vue'
import ContactFilter from '@/cmps/contact-filter.vue'
import UserMsg from '@/cmps/user-msg.vue'

export default {
    data() {
        return {
            contacts: null,
            filterBy: {},
        }
    },
    async created() {
        this.contacts = await contactService.getContacts()
    },
    methods: {
        async removeContact(contactId) {
            const msg = {
                txt: `Contact ${contactId} deleted.`,
                type: 'success',
                timeout: 2500,
            }
            await contactService.deleteContact(contactId)
            this.contacts = this.contacts.filter(contact => contact._id !== contactId)
            eventBus.emit('user-msg', msg)
        },
        onSetFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredContacts() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts.filter(contact => regex.test(contact.vendor))
        },
    },
    components: {
        ContactList,
        ContactFilter,
        UserMsg,
    },
}
</script>

<style lang="scss">
.main-container {
    position: relative;
}
</style>
