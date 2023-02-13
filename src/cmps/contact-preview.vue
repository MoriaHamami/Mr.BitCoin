<template>
  <article class="preview-data">
    <img :src="`https://robohash.org/${contact._id}`" />
    <h2>Name: {{ contact.name }}</h2>
    <h3>Email: {{ contact.email }}</h3>
    <h3>Phone: {{ contact.phone }}</h3>
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
