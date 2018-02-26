<template>
    <div class="shade" :style="{ backgroundColor: background, color: colorStep(background)}">
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
    height: 2rem;
    position: relative;
    z-index: 10;
    padding: 1rem;
    text-align: center;
    cursor: default;
    transition: all .3s ease-out;
    line-height: 2rem;
}
.current {
    z-index: 30;
    font-size: 1.6rem;
    padding: 2rem 1rem;
    text-align: center;
    box-shadow: 0 0 12px 6px rgba(20,20,20,0.125);
}
.shade.current:hover {
    font-size: 1.6rem;
}
.shade:hover {
    position: relative;
    font-size: 1.4rem;
    box-shadow: 0 0 8px 4px rgba(20,20,20,0.125);
    z-index: 20;
}
.shade:active {
    font-size: 1rem;
    font-size: 1rem;
    box-shadow: 0 0 4px 2px rgba(20,20,20,0.125);
    z-index: 20;
}
</style>
