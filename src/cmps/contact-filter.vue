<template>
    <div class="contact-filter">
        <input @input="onFilter" v-model="filterBy.txt" type="text" placeholder="Search contact...">
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },
    methods: {
        onFilter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
</script>

<style lang="scss"></style>
