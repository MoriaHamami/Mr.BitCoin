<template>
  <section class="home-page">
    <h2>Current Bitcoin rate: {{rate}}</h2>
    <h2>{{ user.name }}</h2>
    <h3>{{ user.balance }}</h3>
    <h3 v-if="!user.transactions">No transactions</h3>
    <h3 v-if="user.transactions">Transactions</h3>
    <ul v-if="user.transactions">
      {{user.transactions.map(transaction => { return `
      <li>${transaction}</li>
      ` })}}
    </ul>
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
      rate: 0
    };
  },
  created() {
    this.user = userService.getUser();
    this.getRate()
  },
   methods: {
        async getRate() {
            const rate = await bitcoinService.getRate()
            this.rate = rate
            // return rate
        }
    }
};
</script>

