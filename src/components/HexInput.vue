<template>
    <input class="hex-input" type="text" v-bind:value="value" v-on:input="updateValue($event.target.value)" :style="{backgroundColor: value}">
</template>

<script>
export default {
  name: 'HexInput',
  props: ['value'],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    }
  }
}
</script>

<style lang="scss">
.hex-input {
    color: inherit;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 1rem;
    margin: 0;
    border: none;
    -webkit-appearance: none;
    font-size: 1.5rem;
    text-align: center;
}
</style>
