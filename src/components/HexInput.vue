<template>
    <input class="hex-input" :class="{invalid: !valid}" type="text" v-bind:value="value" v-on:keyup.enter="enterAdd()" @input="updateValue($event.target.value)">
</template>

<script>
export default {
  name: 'HexInput',
  props: ['value', 'valid'],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    },
    enterAdd: function() {
      this.$emit('enterAdd', this);
    }
  }
}
</script>

<style lang="scss">
.hex-input {
  height: 6rem;
  color: inherit;
  background-color: transparent;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1rem;
  margin: 0;
  border: none;
  -webkit-appearance: none;
  font-size: 1.5rem;
  text-align: center;
  &:focus {
    outline: none;
  }
}
</style>
