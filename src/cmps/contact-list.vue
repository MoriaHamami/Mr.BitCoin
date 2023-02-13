<template>
  <section>
    <TransitionGroup name="list" tag="ul" class="contact-list">
      <li
        class="contact-preview"
        v-for="contact in contacts"
        :key="contact._id"
      >
        <button @click="onRemoveContact(contact._id)" class="delete-btn">x</button>
        <ContactPreview :contact="contact" />
        <section class="actions">
          <RouterLink :to="`/contact/${contact._id}`">
            <button>Details</button>
          </RouterLink>
          <RouterLink :to="`/contact/edit/${contact._id}`">
            <button>Edit</button>
          </RouterLink>
        </section>
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
import ContactPreview from "@/cmps/contact-preview.vue";
export default {
  // props: ['contacts']
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemoveContact(contactId) {
      this.$emit("remove", contactId);
    },
    printThem() {
      console.log("contacts:", contacts);
    },
  },
  components: {
    ContactPreview,
  },
};
</script>

<style lang="scss"></style>
