import { Store } from 'vuex'
import { StateInterface } from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StateInterface>;
  }
}
