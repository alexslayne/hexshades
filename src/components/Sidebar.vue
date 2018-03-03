<template>
    <div class="sidebar">
        <header>
            <img class="logo" src="../assets/shades.svg" alt="Hex Shades">            
            <h1>hexshades</h1>
            <p>A color tool for generating a range of shades from lightest to darkest. Inspired by <a href="http://0to255.com" target="_blank">0to255</a>.</p>
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
.sidebar h1 {
    padding: .2rem 0;
    margin: 0;
}
.sidebar a, a:active, a:focus, a:visited {
  color: #aaa;
  text-decoration: none;
  transition: color .3s ease-out;
}
.sidebar a:hover {
  color: #fff;
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


