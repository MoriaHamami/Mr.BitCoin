<template>
  <form v-if="contact" class="contact-edit body">
    <h1>{{ getTitle }}</h1>
    <input type="text" v-model="contact.name" placeholder="Enter name" />
    <input
      type="email"
      v-model="contact.email"
      placeholder="Enter email address"
    />
    <input
      type="text"
      v-model="contact.phone"
      placeholder="Enter phone number"
    />
    <button v-if="contact" @click="onRemoveContact(contact._id)" >Delete</button>
    <RouterLink to="/contact">
      <button>Back</button>
    </RouterLink>
    <button @click="onSave()">Save</button>
  </form>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { showErrorMsg, showSuccessMsg } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      const currContact = await contactService.getContactById(contactId);
      this.contact = {...currContact}
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    async onSave() {
      try {
          // const savedContact = await contactService.saveContact(this.contact);
          console.log('here:', this.contact)
        this.$store.dispatch({ type: "saveContact", contact: this.contact });
        this.$router.push("/contact");
        showSuccessMsg(`Contact ${savedContact.name} saved successfully.`);
        // this.contact = null;
      } catch (err) {
        showErrorMsg(`Cannot save contact.`);
      }
    },
    async onRemoveContact(contactId) {
      try {
        // await contactService.deleteContact(contactId);
        this.$store.commit({ type: "removeContact", contactId });
        showSuccessMsg(`Contact ${contactId} deleted.`);
      } catch (err) {
        showErrorMsg(`Cannot delete contact ${contactId}.`);
      }
    },
  },
  computed: {
    getTitle() {
      return (this.contact._id ? "Edit" : "Add") + " Contact";
    },
  }
};
</script>

<style lang="scss"></style>
