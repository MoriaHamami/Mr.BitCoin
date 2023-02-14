<template>
  <section class="home-page body">
    <h2 class="rate">Current Bitcoin rate: 1 USD = {{ rate }} BTC</h2>
    <div class="user-data">
      <h2>Name: {{ user?.name }}</h2>
      <h3>Balance: {{ user?.balance }} BTC</h3>
          <TransactionList v-if="user?.transactions" :transactions="user.transactions"/>
      <!-- <h3 v-if="!user?.transactions?.length">No transactions</h3>
      <h3 v-if="user?.transactions?.length">Transactions</h3>
      <ul v-if="user?.transactions?.length">
        {{user.transactions.map(transaction => { return `
        <li>${transaction}</li>
        ` })}} -->
      <!-- </ul> -->
    </div>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";
import { showErrorMsg } from "@/services/eventBus.service.js";
import  TransactionList from "@/cmps/transaction-list.vue";

export default {
  data() {
    return {
      user: null,
      rate: 0,
    };
  },
  async created() {
    try {
      this.user = await userService.getUser();
      if (!this.user) {
        this.$router.push("/signup");
        showErrorMsg("Could not find user");
      }
      this.getRate();
    } catch {
      this.$router.push("/signup");
      showErrorMsg("Could not find user");
    }
  },
  methods: {
    async getRate() {
      const rate = await bitcoinService.getRate();
      this.rate = rate;
      // return rate
    },
  },
   components: {
    TransactionList,
  },
};
</script>

