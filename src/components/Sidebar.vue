<template>
  <div class="sidebar">
        <header>
            <h1>Hexshades</h1>
        </header>
        <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['currentHex']
}
</script>

<style lang="scss">
.sidebar {
    flex: 1;
    background-color: #111;
    height: 100vh;
    color: #eee;
    box-sizing: border-box;
}
header {
    padding: 1rem;
}

</style>


