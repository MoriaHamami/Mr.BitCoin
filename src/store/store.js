import { contactStore } from './contact.store.js'
import { createStore } from 'vuex'

export const myStore = createStore({
    strict: true,
    modules: {
        contactStore
    }
})

// FOR DEBUG
// myStore.subscribe((cmd, state) => {
//     console.log('**** Store state changed: ****')
//     console.log('Command:', cmd.payload)
//     console.log('storeState:\n', state)
//     console.log('*******************************')
// })

