<template>
<div
  v-if="devMode"
  class="debug-menu absolute-top-left bg-darkgray q-pa-sm q-ma-sm row content-center"
>
  <q-btn
    :icon="expanded ? 'close' : 'api'"
    @click="expanded = !expanded"
    padding="sm"
    unelevated
    class="no-border-radius"
  />

  <template v-if="expanded">
    <h5 class="q-ma-none" style="vertical-align: text-bottom;">DEBUG MENU</h5>
    <div class="menu col-12">
      <slot />
    </div>
  </template>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FlagDisplay',
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    devMode (): boolean {
      return process.env.NODE_ENV === 'development'
    }
  }
})
</script>
