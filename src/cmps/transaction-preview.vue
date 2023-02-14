<template>
  <!-- <ul v-if="transactions?.length">
      {{user.transactions.map(transaction => { return `
      <li>${transaction}</li>
      ` })}}
    </ul> -->
  <article>
    <h2>From: {{ transaction.from }}</h2>
    <h3>To: {{ transaction.to }}</h3>
    <h3>Fund: {{ transaction.amount + " BTC" }}</h3>
  </article>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
};
</script>