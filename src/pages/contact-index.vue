<template>
  <div class="contact-index body">
    <ContactFilter @filter="onSetFilterBy" />
    <RouterLink to="/contact/edit"><button class="add-btn">Add a Contact</button></RouterLink>
    <ContactList @remove="removeContact" v-if="contacts" :contacts="contacts" />
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "@/services/eventBus.service.js";

import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";

export default {
  data() {
    return {
    //   contacts: this.$store.state.contactStore.contacts,
    //   filterBy: {},
    };
  },
  async created() {
    this.$store.dispatch({ type: "loadContacts" });
  },
  methods: {
    async removeContact(contactId) {
      try {
        this.$store.commit({ type: "removeContact", contactId });
        showSuccessMsg(`Contact ${contactId} deleted.`);
      } catch (err) {
        showErrorMsg(`Cannot delete contact ${contactId}.`);
      }
    },
    onSetFilterBy(filterBy) {
    //   this.filterBy = filterBy;
      this.$store.dispatch({ type: "loadContacts", filterBy });
    },
  },
  computed: {
    contacts() {
              return this.$store.getters.contacts;

    //   return this.$store.state.contactStore.contacts;
    },
  },
//   watch: {
//     contactsFromStore() {
//       this.contacts = this.$store.state.contactStore.contacts;
//     },
//   },
  components: {
    ContactList,
    ContactFilter,
  },
};
</script>

<style lang="scss">
.main-container {
  position: relative;
}
</style>
