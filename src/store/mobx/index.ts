import React from 'react'
import { observable, action } from 'mobx';
import { observer, useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0
export type TFriend = {
  name: string
  isFavorite: boolean
  isSingle: boolean
}

export const createStore = observable({
  // note the use of this which refers to observable instance of the store

    friends: [] as TFriend[],
    makeFriend(name, isFavorite = false, isSingle = false) {
      const oldFriend = this.friends.find(friend => friend.name === name)
      if (oldFriend) {
        oldFriend.isFavorite = isFavorite
        oldFriend.isSingle = isSingle
      } else {
        this.friends.push({ name, isFavorite, isSingle })
      }
    },
    get singleFriends() {
      return this.friends.filter(friend => friend.isSingle)
    },
  
})

// export type TStore = ReturnType<typeof createStore>

export class GlobalStore {
	@observable count = 1;	
}

console.log(createStore)

const storeContext = React.createContext({
  friendStore: createStore,
  globalStore: new GlobalStore()
})


// export const StoreProvider = ({ children }) => {
//   const store = useLocalStore(createStore)
//   return <storeContext.Provider value={store}>{children}</storeContext.Provider>
// }

export const useStore = () => {
  const store = React.useContext(storeContext)
  // if (!store) {
  //   // this is especially useful in TypeScript so you don't need to be checking for null all the time
  //   throw new Error('useStore must be used within a StoreProvider.')
  // }
  return store
}