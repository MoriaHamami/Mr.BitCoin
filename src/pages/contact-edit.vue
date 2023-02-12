<template>
    <form @submit.prevent="save" v-if="contact" class="contact-edit">
        <input type="text" v-model="contact.name" placeholder="Enter name">
        <input type="email" v-model="contact.email" placeholder="Enter email address">
        <input type="text" v-model="contact.phone" placeholder="Enter phone number">
        <button>Save</button>
    </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
export default {
    data() {
        return {
            contact: null,
        }
    },
    async created(){
        const contactId = this.$route.params._id
        if(contactId) {
            this.contact = await contactService.getContactById(contactId)
        } else {
            this.contact = contactService.getEmptyContact()
        }
    },
    methods: {
        async save() {
            await contactService.saveContact(this.contact)
            this.$router.push('/contact')
        }
    }
}
</script>

<style lang="scss"></style>
