<template>
  <section>
    <h3 v-if="!transactions.length">No transactions</h3>
    <h3 v-if="transactions.length">Transactions</h3>
    <TransitionGroup name="list" tag="ul" class="transactions-list">
      <li
        class="transactions-preview"
        v-for="transaction in transactions"
        :key="transaction._id"
      >
        <TransactionPreview :transaction="transaction" />
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
import TransactionPreview from "@/cmps/transaction-preview.vue";
export default {
  // props: ['transactionss']
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  components: {
    TransactionPreview,
  },
};
</script>

