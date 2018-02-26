<template>
  <div class="hex" @click="setCurrentHex(hex, index)">
      <header :style="{backgroundColor: hex}"></header>
      <footer :style="{backgroundColor: textColor, color: hex}">
          {{hex}}
      </footer>
  </div>
</template>

<script>
export default {
  name: 'Hex',
  props: ['hex', 'textColor', 'current', 'index', 'active'],
  methods: {
    setCurrentHex: function (hex, index) {
        this.$emit('update:current', hex)
        this.$emit('update:active', index)
    }
  }
}
</script>

<style>
    .hex {
        height: 5rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 33%;
        cursor: default;
        transition: all .3s ease-out;
    }
    .hex header {
        height: 2rem;
        padding: 0 1rem;
        flex: 1;
    }
    .hex footer {
        padding: 0 1rem;
        flex: 2;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
</style>

