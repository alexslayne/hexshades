<template>
    <div class="shade" :style="{ backgroundColor: background, color: colorStep(background) }">
        <slot></slot>
    </div>
</template>

<script>
var tinycolor = require('tinycolor2')

export default {
    name: 'Shade',
    props: ['background'],
    methods: {
        colorStep: function(hex) {
            let newColor = tinycolor(hex)
            if (newColor.isDark()) {
                newColor = newColor.lighten(50).toString()
            } else {
                newColor = newColor.darken(50).toString()
            }
            return newColor
        }
    }
}
</script>

<style>
.shade {
    padding: 1rem;
    text-align: center;
}
</style>
