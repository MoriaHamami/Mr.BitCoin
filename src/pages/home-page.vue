<template>
  <section class="home-page body">
    <h2 class="rate">Current Bitcoin rate: 1 USD = {{ rate }} BTC</h2>
    <div class="user-data">
      <h2>Name: {{ user.name }}</h2>
      <h3>Balance: ${{ user.balance }}</h3>
      <h3 v-if="!user.transactions.length">No transactions</h3>
      <h3 v-if="user.transactions.length">Transactions</h3>
      <ul v-if="user.transactions.length">
        {{user.transactions.map(transaction => { return `
        <li>${transaction}</li>
        ` })}}
      </ul>
    </div>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      user: null,
      filterBy: {},
      rate: 0,
    };
  },
  created() {
    this.user = userService.getUser();
    this.getRate();
  },
  methods: {
    async getRate() {
      const rate = await bitcoinService.getRate();
      this.rate = rate;
      // return rate
    },
  },
};
</script>

