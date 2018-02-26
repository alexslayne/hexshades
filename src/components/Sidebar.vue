<template>
  <div class="sidebar">
        <header>
            <img class="logo" src="../assets/shades.svg" alt="Hex Shades">            
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
    overflow-y: scroll;
}
header {
    padding: 1rem;
    text-align: center; 
}
.logo {
  padding: 10px 0 0 0;
  width: 120px;
}
@media screen and (max-width: 768px) {
    .sidebar {
        height: auto;
    }
}
</style>


