<template>
  <q-page class="relative row items-center justify-evenly">
    <div id="debug-panel" class="absolute-top-left">
      <pre>{{ $store.state.FlagGayme.gameState }}</pre>
      <pre>{{ $store.state.FlagGayme.inputName }}</pre>
      <pre>{{ $store.state.FlagGayme.current }}</pre>
      <pre>{{ $store.getters['FlagGayme/difficulty'] }}</pre>
    </div>

    <!-- MAIN MENU -->
    <div id="main-menu" v-if="$store.state.FlagGayme.gameState === 'MAINMENU'">
      <q-btn
        color="positive"
        size="lg"
        outline
        class="no-border-radius"
        @click="$store.dispatch('FlagGayme/setGameState', 'ONGOING')"
      >START GAYME</q-btn>
    </div>

    <!-- ONGOING GAME -->
    <div id="ongoing" v-if="$store.state.FlagGayme.gameState === 'ONGOING'">
      <FlagDisplay :flag="getFlag($store.state.FlagGayme.current.flag)" />

      <!-- INPUT -->
      <q-input
        square
        outlined
        label="Input Flag Name"
        v-model="flagNameInput"
        @keypress.enter="submitAnswer($event.target.value)"
      />

      <!-- IN GAME ACTIONS -->
      <div class="row">
        <q-btn
          unelevated
          class="no-border-radius col"
          @click="$store.dispatch('FlagGayme/randomizeFlag')"
        >SKIP</q-btn>

        <q-btn
          unelevated
          class="no-border-radius col"
          @click="$store.dispatch('FlagGayme/setGameState', 'MAINMENU')"
        >QUIT</q-btn>
      </div>
    </div>

    <!-- GAME OVER -->
    <div id="game-over" v-if="$store.state.FlagGayme.gameState === 'GAMEOVER'">
      <p>Well done. Ya did it.</p>
      <q-btn
        color="positive"
        size="lg"
        outline
        class="no-border-radius"
        @click="$store.dispatch('FlagGayme/setGameState', 'MAINMENU')"
      >PLAY AGAYNE</q-btn>
    </div>

  </q-page>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

import FlagDisplay from '../components/FlagDisplay.vue'

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PagePlay',
  components: { FlagDisplay },
  data () {
    return {
      flagNameInput: ''
    }
  },
  computed: {
    ...mapGetters('Flags', ['getFlag']),
    ...mapGetters('FlagGayme', ['correctHistory'])
  },
  methods: {
    submitAnswer (value: string): void {
      void this.$store.dispatch('FlagGayme/submitAnswer', value)
      this.flagNameInput = ''
    }
  }
})
</script>
