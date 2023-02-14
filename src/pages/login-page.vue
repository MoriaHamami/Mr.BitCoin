<template>
  <section class="login-page">
    <div class="user-data">
      <form @submit="onGetUser">
        <input type="text" v-model="userName" placeholder="Enter username..." />
        <!-- <RouterLink to="/"> -->
        <button>Enter</button>
        <!-- </RouterLink> -->
      </form>
    </div>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";
// import { bitcoinService } from "@/services/bitcoin.service.js";
import { showErrorMsg } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      userName: null,
    };
  },
  methods: {
    async onGetUser() {
      try {
        await userService.saveUser(this.userName);
        this.$router.push("/");
      } catch {
        showErrorMsg("Could not login / signup");
      }
    },
  },
};
</script>

