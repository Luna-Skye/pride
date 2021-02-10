import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

//* -----------------------------------------------------------
//  EXTERNAL MODULE IMPORTS -----------------------------------
import Flags, { FlagsStateInterface } from './module-Flags'
import FlagGayme, { FlagGaymeStateInterface } from './module-FlagGayme'

//* -----------------------------------------------------------
//  CORE STATE INTERFACE --------------------------------------
export interface StateInterface {
  Flags: FlagsStateInterface;
  FlagGayme: FlagGaymeStateInterface;
}

//* -----------------------------------------------------------
//  CORE STORE OBJECT -----------------------------------------
export default store(() => {
  const Store = createStore<StateInterface>({
    modules: {
      Flags,
      FlagGayme
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})
