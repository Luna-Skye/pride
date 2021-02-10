<template>
<div
  class="flag-display"
  :style="{
    width: `${width}px`,
    height: `${height}px`
  }"
>
  <!-- FLAG ELEMENT DESIGN -->
  <div class="design">
    <template
      v-for="(el, e) in flagDesign"
      :key="`${flag.name}_design_${e}`"
    >
      <div v-if="!el.hasOwnProperty('img')" class="stripe" :style="{ background: el.col, height: el.size }"></div>
      <img v-else class="img" :src="el.img" :style="el.style">
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { Flag, FlagElement } from '../store/module-Flags'

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FlagDisplay',
  props: {
    flag: {
      type: Object as () => Flag,
      default: null
    },
    width: {
      type: String as () => string,
      default: '320'
    },
    height: {
      type: String as () => string,
      default: '200'
    }
  },
  computed: {
    flagDesign () {
      // Init Return Result
      const res: FlagElement[] = []

      // Loop through all Flag Elements
      this.flag.elements.forEach((el: FlagElement|string) => {
        // Define Size for String Based Elements
        if (typeof el === 'string') res.push({ col: el, size: '100%' })
        else res.push(el)
      })

      // Return Result
      return res
    }
  }
})
</script>

<style lang="scss">
.flag-display {
  transition: 0.15s ease;
  border-radius: 0px;
  overflow: hidden;

  > h2 > a { color: white; }

  > .design {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    > .stripe {
      height: 100%;
      width: 100%;
    }

    > .img {
      position: absolute;
    }
  }
}
</style>
