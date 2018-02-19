<template>
  <div id="app">
    <sidebar :currentHex="currentHex" :v-model="currentHex">
      <div class="container" :style="{color: colorStep(currentHex), backgroundColor: currentHex}">
        <hex-input v-model="currentHex"/>
        <div class="button-group" :style="{borderColor: colorStep(currentHex)}">
          <button @click="addHex">Save</button>
          <button @click="randomHex">Random</button>
          <button>Delete</button>
        </div>
      </div>
      <div class="hexes">
        <hex v-for="hex in hexes" :hex="hex" :textColor="colorStep(hex)" :key="hex.id"></hex>
      </div>
    </sidebar>
    <shades :hexes="shades" :valid="validHex" :textColor="colorStep(currentHex)">
    </shades>
  </div>
</template>

<script>
var tinycolor = require('tinycolor2')

export default {
  name: 'app',
  data () {
    return {
      currentHex: '#ffffff',
      hexes: []
    }
  },
  methods: {
    addHex: function() {
      this.hexes.push(this.currentHex);
    },
    randomHex: function() {
      this.currentHex = tinycolor.random().toHexString()
    },
    colorStep: function(hex) {
      let newColor = tinycolor(hex)
      if (newColor.isDark()) {
        newColor = newColor.lighten(50).toString()
      } else {
        newColor = newColor.darken(50).toString()
      }
      return newColor
    }
  },
  computed: {
    validHex: function () {
      return this.tinyHex.isValid()
    },
    tinyHex: function() {
      return(tinycolor(this.currentHex))
    },
    inputColor: function() {
      if (this.validHex === true) {
        
      } else {
        return '#333333'
      }
    },
    shades: function() {
      let initialLight = tinycolor(this.currentHex)
      let initialDark = tinycolor(this.currentHex)
      let shades = [];
      for (let i = 0; i < 35; i++) {
        shades.push(initialLight.lighten(3).toString())
      }
      shades.reverse();
      shades.push(this.currentHex)
      for (let i = 0; i < 35; i++) {
        shades.push(initialDark.darken(3).toString())
      }
      shades = shades.filter(function (elem, index, self) {
        return index === self.indexOf(elem)
      })
      return shades
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
}

.button-group {
  display: flex;
  border-top: 1px dashed #333;
}

.button-group button {
  -webkit-appearance: none;
  background-color: transparent;
  padding: 1rem;
  flex: 1;
  border: none;
  color: inherit;
}

.hexes {
  margin-top: 1rem;
  display: flex;
  flex-flow: row wrap;
}

@media screen and (max-width: 768px) {
  #app {
    display: block;
  }
}
</style>
