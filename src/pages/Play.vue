<template>
  <q-page class="relative row items-center justify-evenly">
    <DebugMenu>
      <pre>{{ $store.state.FlagGayme.gameState }}</pre>
      <pre>{{ $store.state.FlagGayme.inputName }}</pre>
      <pre>{{ $store.state.FlagGayme.current }}</pre>
      <pre>{{ $store.getters['FlagGayme/difficulty'] }}</pre>
    </DebugMenu>

    <!-- MAIN MENU -->
    <div id="main-menu" v-if="$store.state.FlagGayme.gameState === 'MAINMENU'">
      <q-btn
        color="positive"
        size="lg"
        outline
        class="no-border-radius"
        @click="startGame"
      >START GAYME</q-btn>
    </div>

    <!-- ONGOING GAME -->
    <div id="ongoing" v-if="$store.state.FlagGayme.gameState === 'ONGOING'" class="q-gutter-md">
      <!-- SCORE/TIME DISPLAY -->
      <div class="row">
        <div class="col">
          <p class="text-caption q-my-none">Base Score:</p>
          <p class="text-h5 q-my-none">{{ $store.state.FlagGayme.current.score }}</p>
        </div>
        <div class="col">
          <p class="text-caption q-my-none text-right">Time Remaining:</p>
          <p class="text-h5 q-my-none text-right">{{ $store.state.FlagGayme.current.time }}</p>
        </div>
      </div>

      <!-- FLAG RENDERER -->
      <div class="row">
        <FlagDisplay :flag="getFlag($store.state.FlagGayme.current.flag)" />
      </div>

      <!-- INPUT -->
      <div class="row">
        <q-input
          ref="FlagNameInput"
          square
          outlined
          class="full-width"
          label="Input Flag Name"
          v-model="flagNameInput"
          @keypress.enter="submitAnswer($event.target.value)"
        />
      </div>

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

import DebugMenu from '../components/DebugMenu.vue'
import FlagDisplay from '../components/FlagDisplay.vue'
import { QInput } from 'quasar'

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PagePlay',
  components: { DebugMenu, FlagDisplay },
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
    startGame () {
      // Dispatch GameState Change
      void this.$store.dispatch('FlagGayme/setGameState', 'ONGOING')

      // Autofocus FlagNameInput
      setTimeout(() => {
        // Potentially the sloppiest thing I've ever written
        // But it does work
        const input: QInput = (this.$refs.FlagNameInput as QInput).$el as QInput
        input.focus()
      }, 50)
    },
    submitAnswer (value: string): void {
      // Dispatch Answer Submission
      void this.$store.dispatch('FlagGayme/submitAnswer', value)
      this.flagNameInput = ''
    }
  }
})
</script>
