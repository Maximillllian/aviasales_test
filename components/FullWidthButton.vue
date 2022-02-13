<template>
    <div class="full-width-button" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        handleClick() {
            this.$emit('click')
        }
    }
})
</script>

<style lang="scss" scoped>
.full-width-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background: $blue;
    color: white;
    border-radius: $border-radius;
    cursor: pointer;
}
</style>