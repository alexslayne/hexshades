<template>
  <main class="shades">
      <div class="shades-container">
          <shade v-if="valid" v-for="hex in hexes" :key="hex.id" :background="hex">
              {{hex}}
          </shade>
      </div>
  </main>
</template>

<script>
export default {
  name: 'Shades',
  props: ['hexes', 'valid']
}
</script>

<style lang="scss">
.shades {
    overflow-y: scroll;
    height: 100vh;
    flex: 2;
}
</style>
