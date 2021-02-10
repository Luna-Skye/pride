/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import _ from 'lodash'
import { Flag } from './module-Flags'
import { Module } from 'vuex'
import { StateInterface } from './index'

//* -----------------------------------------------------------
//  MODULE STATE INTERFACE ------------------------------------
export type GameState = 'MAINMENU' | 'ONGOING' | 'GAMEOVER' | 'LEADERBOARD'
export type GameCurrent = {
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'NIGHTMARE' | 'TEST';
  flag: string;
  score: number;
  time: number;
  history: {
    flag: string;
    correct: boolean;
  }[];
  stats: Record<string, string>;
}
export type Difficulty = {
  StartTime?: number;
  TimeOnSuccess?: number;
  TimeOnFail?: number;
  ScoreOnSuccess?: number;
  ScoreOnFail?: number;
  ScorePerSec?: number;
  Flags?: string[];
}
export interface FlagGaymeStateInterface {
  gameState: GameState;
  gameTimer: number | undefined;

  current: GameCurrent;
  difficulty: {
    global: Difficulty;
    list: {
      [name: string]: Difficulty
    };
  };
}

//* -----------------------------------------------------------
//  MODULE STATE DATA -----------------------------------------
const ModuleFlagGayme: Module<FlagGaymeStateInterface, StateInterface> = {
  namespaced: true,

  state: (): FlagGaymeStateInterface => {
    return {
      //* Game State
      gameState: 'MAINMENU',
      gameTimer: undefined,

      //* Ongoing Game Values
      current: {
        difficulty: 'EASY',
        flag: 'Progress',
        score: 0,
        time: 90,
        history: [],
        stats: {}
      },

      //* Difficulty Values
      difficulty: {
        global: {
          StartTime: 90,
          TimeOnSuccess: 15,
          TimeOnFail: -5,
          ScoreOnSuccess: 10,
          ScoreOnFail: -5,
          ScorePerSec: 1.5
        },
        list: {
          EASY: {
            Flags: ['Progress', 'Transgender', 'Nonbinary', 'Gay Male', 'Lesbian', 'Bisexual', 'Pansexual']
          },
          NORMAL: {
            Flags: ['Progress', 'Transgender', 'Transfem', 'Transmasc', 'Demigirl', 'Demiboy', 'Aromantic', 'Asexual', 'Agender', 'Nonbinary', 'Gay Male', 'Lesbian', 'Bisexual', 'Pansexual']
          },
          NIGHTMARE: {},
          TEST: {
            StartTime: 1200,
            TimeOnSuccess: 120,
            TimeOnFail: 0
          }
        }
      }
    }
  },

  getters: {
    //* CURRENT DIFFICULTY OBJECT ---------------------------------------------
    //  Returns Current Difficulty Merged with Global Vals --------------------
    difficulty (state): Difficulty {
      return _.merge(
        _.cloneDeep(state.difficulty.list[state.current.difficulty]),
        _.cloneDeep(state.difficulty.global)
      )
    },

    //* CURRENT FLAG INFO -----------------------------------------------------
    //  Returns Current Flag Information --------------------------------------
    flag (state, getters, rootState): Flag | undefined {
      return rootState.Flags.list.find((flag: Flag) => {
        return flag.name === state.current.flag
      })
    },

    //* CORRECT HISTORY FLATMAP -----------------------------------------------
    //  Returns Flat Correct History SET | Used for FilteredFlags -------------
    // ?Maybe Refactor the Name of this Getter --------------------------------
    correctHistory (state): string[] {
      return _.map(
        state.current.history.filter((el: Record<string, string|boolean>) => el.correct),
        'flag'
      )
    },

    //* FILTERED FLAGS | Difficulty/History -----------------------------------
    //  Returns FlagList of Unanswered/Incorrect Flags within Difficulty ------
    filteredFlags (state, getters, rootState): Flag[] {
      return rootState.Flags.list.filter((flag: Flag) => {
        return !_.includes(getters.correctHistory, flag.name) && (
          getters.difficulty.Flags
            ? _.includes(getters.difficulty.Flags, flag.name)
            : true)
      })
    }
  },

  mutations: {
    //* GAME STATE MANAGEMENT -------------------------------------------------
    //  Managing GameState & Current Values -----------------------------------
    setGameState (state, payload: GameState): void { state.gameState = payload },
    setCurrent (state, payload: GameCurrent): void { state.current = payload },

    //* SET FLAG BY STRING ----------------------------------------------------
    //  Set Current Flag to Defined String ------------------------------------
    setFlag (state, payload: string): void { state.current.flag = payload },

    //* SET GAMETIMER ID ------------------------------------------------------
    //  Set GameTimer to Passed ID Payload ------------------------------------
    setTimerID (state, payload: number): void { state.gameTimer = payload },
    countdown (state): void { if (state.current.time > 0) state.current.time -= 1 },

    //* HANDLE SUBMITTED ANSWER -----------------------------------------------
    //  Apply Values to Game Current ------------------------------------------
    //  TODO | Define Payload Type --------------------------------------------
    handleAnswer (state, payload: Record<string, any>): void {
      if (payload.correct) {
        state.current.time += payload.difficulty.TimeOnSuccess
        state.current.score += payload.difficulty.ScoreOnSuccess
      } else {
        state.current.time += payload.difficulty.TimeOnFail
        state.current.score += payload.difficulty.ScoreOnFail
      }
      state.current.history.push({ flag: payload.flag, correct: payload.correct })
    }
  },

  actions: {
    //* GAME STATE MANAGEMENT -------------------------------------------------
    //  Setting & Handling GameState Dynamically ------------------------------
    setGameState ({ state, dispatch, commit, getters }, newState: GameState) {
      // Handle Individual State Management Functions
      switch (newState) {
        case 'MAINMENU': //* MAIN MENU STATE ----------------------------------
          void dispatch('setTimer', false)
          break
        case 'ONGOING': //*  CURRENTLY ONGOING GAME ---------------------------
          // Reset Current Values
          commit('setCurrent', {
            difficulty: state.current.difficulty,
            flag: 'Progress',
            score: 0,
            time: getters.difficulty.StartTime,
            history: [],
            stats: {}
          })
          void dispatch('setTimer', true)
          break
        case 'GAMEOVER': //* GAME OVER STATE ----------------------------------
          void dispatch('setTimer', false)
          break
      }

      // Commit GameState to Store
      commit('setGameState', newState)
    },

    //* SET GAMETIMER ---------------------------------------------------------
    //  Start/Clear GameTimer -------------------------------------------------
    setTimer ({ state, commit, dispatch }, start: boolean) {
      // Start Timer
      if (start) {
        commit('setTimerID', window.setInterval(() => {
          // Call Countdown Commit
          commit('countdown')

          // If Time hits 0 : GAMEOVER
          if (state.current.time <= 0) void dispatch('setGameState', 'GAMEOVER')
        }, 1000))
      } else window.clearInterval(state.gameTimer) // Else Clear Timer
    },

    //* RANDOMIZE FLAG --------------------------------------------------------
    //  Set Current Flag to Random within FilteredFlags List ------------------
    randomizeFlag ({ state, commit, dispatch, getters }): void {
      // Check if unanswered/incorrect Flags remain in this Difficulty
      if (getters.filteredFlags.length > 0) {
        // Get Random Name
        const randomFlag = getters.filteredFlags[
          Math.floor(Math.random() * getters.filteredFlags.length)
        ].name

        // Rerun if RandomFlag is same as CurrentFlag
        if (state.current.flag === randomFlag && getters.filteredFlags.length > 1) {
          void dispatch('randomizeFlag')
          return
        }

        // Set Flag to Random
        commit('setFlag', randomFlag)
      }
    },

    //* SUBMIT ANSWER ---------------------------------------------------------
    //  Check if Input Name is Correct & Call Respective Commits --------------
    submitAnswer ({ state, commit, dispatch, getters }, value: string): void {
      // Check If Answer is Correct
      const correct = (
        _.lowerCase(value) === _.lowerCase(getters.flag.name) ||
        _.includes(getters.flag.tags, _.lowerCase(value))
      )

      // Handle Answer Submission | Call Commits
      commit('handleAnswer', {
        difficulty: getters.difficulty,
        flag: state.current.flag,
        correct
      })

      // Check if all Flags have been correctly answered
      if (getters.filteredFlags.length === 0) {
        commit('setGameState', 'GAMEOVER')
        return
      }

      // Call for New Random Flag
      void dispatch('randomizeFlag')
    }
  }
}

export default ModuleFlagGayme
