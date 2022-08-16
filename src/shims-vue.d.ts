/* eslint-disable */
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare const VUE_APP_BASE_URL: string
declare module '*.json'

// import { Store } from 'vuex'
// import { Store } from './store'

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: Store<State>
//   }
// }

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
// declare module 'vuex' {
//   export function useStore(key?: string): Store<State>
// }
