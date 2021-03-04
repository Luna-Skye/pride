<template>
  <q-page class="relative row items-center justify-evenly">
    <DebugMenu>
      <pre>{{ $store.state.FlagGayme.gameState }}</pre>
      <pre>{{ $store.state.FlagGayme.inputName }}</pre>
      <pre>{{ $store.state.FlagGayme.current }}</pre>
      <pre>{{ $store.getters['FlagGayme/difficulty'] }}</pre>
    </DebugMenu>

    <!-- MAIN MENU -->
    <div
      id="main-menu"
      v-if="$store.state.FlagGayme.gameState === 'MAINMENU'"
      class="q-gutter-y-md"
      style="min-width: 256px;"
    >
      <!-- DIFFICULTY SELECTOR -->
      <q-select
        class="row"
        square filled
        label="Difficulty"
        :model-value="$store.state.FlagGayme.current.difficulty"
        @update:modelValue="$store.dispatch('FlagGayme/setDifficulty', $event)"
        :options="$store.getters['FlagGayme/difficulties']"
      />

      <!-- START BUTTON -->
      <q-btn
        color="positive"
        size="lg"
        flat
        class="row no-border-radius full-width"
        @click="startGame"
      >START</q-btn>
    </div>

    <!-- ONGOING GAME -->
    <div
      id="ongoing"
      v-if="$store.state.FlagGayme.gameState === 'ONGOING'"
      class="q-gutter-y-md"
    >
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
          square filled
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
    <div
      id="game-over"
      v-if="$store.state.FlagGayme.gameState === 'GAMEOVER'"
    >
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
        const inputEl: HTMLElement = (this.$refs.FlagNameInput as QInput).$el as HTMLElement
        inputEl.focus()
      }, 50)
    },
    submitAnswer (value: string): void {
      const inputEl: HTMLElement = (this.$refs.FlagNameInput as QInput).$el as HTMLElement

      //* Dispatch Answer Submission
      void this.$store.dispatch('FlagGayme/submitAnswer', value)
        .then((correct: boolean) => {
          const className = correct ? 'answer-true' : 'answer-false'

          //* Animation Classes
          inputEl.classList.add(className) // Add
          setTimeout(() => { // Remove
            if (this.$store.state.FlagGayme.gameState !== 'ONGOING') return
            inputEl.classList.remove(className)
          }, 800)
        })

      //* Clear Input Field
      this.flagNameInput = ''
    }
  }
})
</script>

<style lang="scss">
//* -----------------------------------------------------------
//* INPUT ANSWER ANIMATION ------------------------------------
// TODO | Add toggleable "Simple" anims (just border fades)
@keyframes answerAnim {
  0% {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2, 0);
    opacity: 0;
  }
}

//* Input Answer Globals
.answer-true, .answer-false {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: answerAnim 0.3s ease-out;
  }
}

//* Input Answer - Correct
.answer-true::after { background: $positive; }
//* Input Answer - Incorrect
.answer-false::after { background: $negative; }
</style>
