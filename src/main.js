import Vue from 'vue'
import App from './App.vue'
import Sidebar from './components/Sidebar.vue'
import Shades from './components/Shades.vue'
import Shade from './components/Shade.vue'
import HexInput from './components/HexInput.vue'
import Hex from './components/Hex.vue'

[
  Shade,
  Shades,
  Sidebar,
  HexInput,
  Hex,

].forEach(Component => {
  Vue.component(Component.name, Component)
})

new Vue({
  el: '#app',
  render: h => h(App)
})
