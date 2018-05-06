<template>
  <div id="app">
    <sidebar :currentHex="currentHex">
      <div class="sidebar-input" :class="{invalid: !validHex}" :style="{color: colorStep(currentHex), backgroundColor: currentHex}">
        <hex-input v-model="currentHex" :valid="validHex" v-on:enterAdd="addHex"/>
        <div class="button-group" :style="{borderColor: colorStep(currentHex)}">
          <button @click="addHex">
            <save-icon></save-icon><br>
            <span>Save</span>
          </button>
          <button @click="randomHex">
            <shuffle-icon></shuffle-icon><br>
            <span>Random</span>
          </button>
          <button @click="deleteHex">
            <trash2-icon></trash2-icon><br>
            <span>Delete</span>
          </button>
        </div>
      </div>
      <div class="hexes" v-if="hexes.length > 0">
        <hex v-for="(hex, index) in hexes" :class="{active: index === activeHex}" :hex="hex" :textColor="textColor(hex)" :index="index" :current.sync="currentHex" :active.sync="activeHex" :key="hex.id"></hex>
      </div>
    </sidebar>
    <shades :hexes="shades" :valid="validHex" :current="currentHex" :textColor="colorStep(currentHex)">
    </shades>
    <transition name="fade">
      <div class="notification" v-show="showNotification">
        <transition name="zoom">
          <div class="notification-content" v-show="showNotification" v-html="notificationText">
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import tinycolor from 'tinycolor2'
import { SaveIcon, Trash2Icon, ShuffleIcon, HeartIcon } from 'vue-feather-icons'
import Clipboard from 'clipboard'
export default {
  name: 'app',
  data () {
    return {
      currentHex: '#ffffff',
      activeHex: 0,
      hexes: [],
      clipboard: null,
      notificationText: null,
      showNotification: false
    }
  },
  methods: {
    addHex: function() {
      if (this.validHex) {
        this.hexes.unshift(this.currentHex)
        this.currentHex = this.hexes[0]
        this.activeHex = 0
        this.saveHexes()
      }
    },
    randomHex: function() {
      this.currentHex = tinycolor.random().toHexString()
    },
    deleteHex: function() {
      let self = this
      self.hexes.splice(this.activeHex, 1)
      let nextActive = ((this.activeHex < 1) ? 0 : this.activeHex - 1)
      self.activeHex = nextActive
      if (self.hexes.length > 0) {
        self.currentHex = self.hexes[nextActive]
        self.saveHexes()
      } else {
        self.currentHex = '#ffffff'
        self.saveHexes()
      }
    },
    colorStep: function(hex) {
      let newColor = tinycolor(hex)
      if (this.validHex) {
        if (newColor.isDark()) {
          newColor = newColor.lighten(50).toString()
        } else {
          newColor = newColor.darken(50).toString()
        }
        return newColor
      } else {
        return '#333333'
      }
    },
    textColor: function(hex) {
      let newColor = tinycolor(hex)
      if (newColor.isDark()) {
        newColor = newColor.lighten(50).toString()
      } else {
        newColor = newColor.darken(50).toString()
      }
      return newColor
    },
    popNotification(notification) {
      this.notificationText = notification
      this.showNotification = true
      setTimeout(() => {
          this.showNotification = false;
      }, 750);
    },
    createClipboard() {
      let self = this;
      if (Clipboard.isSupported()) {
        if (self.clipboard !== null) {
          self.clipboard.destroy()
        }
        self.clipboard = new Clipboard('.shade')
        self.clipboard.on('success', function (e) {
          self.popNotification('Copied ' + '<strong>' + e.text + '</strong>!')
        })
        self.clipboard.on('error', function(e) {
            self.popNotification('Error: ' + '<strong>' + e.text + '</strong>!')
        });
      }
    },
    fetchHexes() {
      let hexes = JSON.parse(localStorage.getItem('hex-shades'))
      if (hexes == null || hexes === undefined) {
        hexes = []
      }
      return hexes
    },
    saveHexes() {
      localStorage.setItem('hex-shades', JSON.stringify(this.hexes))
    }
  },
  computed: {
    validHex: function () {
      let self = this
      if (!self.currentHex.includes('#')) {
        self.currentHex = '#' + self.currentHex  
      }
      if (this.currentHex.length == 5 || this.currentHex.length > 7) {
        self.currentHex = self.currentHex.substring(0, 7)
        return false;
      } else {
        return this.tinyHex.isValid()
      }
    },
    tinyHex: function() {
      return(tinycolor(this.currentHex))
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
  },
  components: {
    SaveIcon, ShuffleIcon, Trash2Icon, HeartIcon
  },
  updated() {
    this.createClipboard();
  },
  mounted() {
    let self = this
    self.hexes = self.fetchHexes()
    if (self.hexes.length === 0) {
      self.randomHex()
    } else {
      self.currentHex = self.hexes[0]
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

.sidebar-input {
  transition: background-color .3s ease-out;
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
  &:focus {
    box-shadow: none;
    border: none;
    -webkit-appearance: none;
    outline: none;
  }
}

.button-group button > span {
  font-size: .9rem;
  display: block;
  padding-top: .5rem;
}

.hexes {
  margin-top: 1rem;
  display: flex;
  flex-flow: row wrap;
}

.active {
  transform: scale(.9);
}

.invalid {
  background-color: #fff !important;
  color: #333 !important;
}

.notification {
  display: flex;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.notification-content {
  background-color: #fff;
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 2rem;
  align-content: center;
  color: #333;
  border-radius: 8px;
  transform: scale(1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.zoom-enter-active, .zoom-leave-active {
  transition: all .3s;
}
.zoom-enter, .zoom-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(.5);
}


@media screen and (max-width: 768px) {
  #app {
    display: block;
  }
}
</style>
