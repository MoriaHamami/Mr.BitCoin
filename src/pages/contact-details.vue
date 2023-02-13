<template>
  <div v-if="contact" class="contact-details body">
    <img :src="`https://robohash.org/${contact._id}`" />
    <h2>Name: {{ contact.name }}</h2>
    <h3>Email: {{ contact.email }}</h3>
    <h3>Phone: {{ contact.phone }}</h3>
    <!-- <h3 v-if="!contact.transactions">No transactions</h3>
    <h3 v-if="contact.transactions">Transactions</h3>
    <ul v-if="contact.transactions">
      {{contact.transactions.map(transaction => { return `
      <li>${transaction}</li>
      ` })}} -->
    <!-- </ul> -->
    <RouterLink to="/contact">
      <button>Back</button>
    </RouterLink>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getContactById(contactId);
  },
};
</script>

<style lang="scss"></style>
