<template>
  <section class="home-page">
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
// Use the User and Bitcoin services to display the username and his balance,
// and the current Bitcoin rate.
import { userService } from "@/services/user.service.js";

export default {
  data() {
    return {
      user: null,
      filterBy: {},
    };
  },
  created() {
    this.user = userService.getUser();
  },
};
</script>

