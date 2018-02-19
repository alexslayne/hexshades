<template>
  <div class="hex">
      <header :style="{backgroundColor: hex}"></header>
      <footer :style="{backgroundColor: textColor, color: hex}">
          {{hex}}
      </footer>
  </div>
</template>

<script>
export default {
  name: 'Hex',
  props: ['hex', 'textColor']
}
</script>

<style>
    .hex {
        height: 5rem;
        padding: 0;
        margin: 1rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
    }
    .hex header {
        height: 2rem;
        padding: 0 1rem;
        flex: 1;
    }
    .hex footer {
        padding: 0 1rem;
        flex: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
</style>

