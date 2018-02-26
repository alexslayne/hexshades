<template>
  <main class="shades">
      <div class="shades-container">
          <shade v-if="valid" v-for="hex in hexes" :key="hex.id" :background="hex" :class="{current: current == hex}" :data-clipboard-text="hex" :title="hex">
              {{hex}}
          </shade>
      </div>
  </main>
</template>

<script>
export default {
  name: 'Shades',
  props: ['hexes', 'valid', 'current']
}
</script>

<style lang="scss">
.shades {
    overflow-y: scroll;
    height: 100vh;
    flex: 2;
}
@media screen and (max-width: 768px) {
    .shades {
        height: auto;
    }
}
</style>
