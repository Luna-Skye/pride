<template>
  <q-layout view="hHh Lpr lff">
    <!---------------------------------------------------------
    ----------------------- APP HEADER ------------------------
    ------------------------------------------------------- -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="gt-xs">Pride App</q-toolbar-title>

        <q-space />

        <q-tabs class="gt-xs" shrink>
          <q-route-tab
            v-for="(tab, i) in navLinks"
            :key="`navTab_${i}`"
            :label="tab.label"
            :to="tab.to"
            exact
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <!---------------------------------------------------------
    ----------------------- APP CONTENT -----------------------
    ------------------------------------------------------- -->
    <q-page-container>
      <router-view class="q-pb-lg" />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      navLinks: [
        {
          label: 'Play',
          to: '/play'
        }, {
          label: 'Tryouts',
          to: '/tryouts'
        }
      ]
    }
  },
  created () {
    // Set Quasar to DarkMode
    this.$q.dark.set(true)
  }
})
</script>
