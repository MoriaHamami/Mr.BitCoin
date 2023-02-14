<template>
  <form @submit.prevent="onTransferFunds" class="transfer">
    <input v-model="fund" type="number" placeholder="Type fund price (BTC)" />
    <button>Fund</button>
  </form>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { showErrorMsg, showSuccessMsg } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      fund: 0,
    };
  },
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onTransferFunds() {
        try{
            const msg = await userService.transferFunds(this.contact, this.fund);
            showSuccessMsg(msg)
        } catch(err){
            // console.log('err:', err)
            showErrorMsg(err)
        }
    //   this.$emit("filter", this.filterBy);
    },
  },
};
</script>

