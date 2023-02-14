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
    <TransferFunds v-if="contact" :contact="contact" />
    <TransactionList v-if="contact?.transactions" :transactions="contact.transactions"/>
    <RouterLink to="/contact">
      <button>Back</button>
    </RouterLink>
  </div>
</template>

<script>
import { showErrorMsg } from "@/services/eventBus.service.js";
import { contactService } from "@/services/contact.service.js";
import TransferFunds from "@/cmps/transfer-funds.vue";
import  TransactionList from "@/cmps/transaction-list.vue";

export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    try {
      const contactId = this.$route.params._id;
      this.contact = await contactService.getContactById(contactId);
    } catch {
      this.$router.push("/contact");
      showErrorMsg(`Contact not found`);
    }
  },
  components: {
    TransferFunds,
    TransactionList,
  },
};
</script>

<style lang="scss"></style>
