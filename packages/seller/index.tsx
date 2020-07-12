import { injectable, inject } from "inversify";
// import { createStore } from 'redux'
// import { TRoute, routeStore } from './store'
import { getPlugin } from '@kookjs-client/core'
import Route from '@kookjs-client/route'

import Home from './components/Home'

@injectable()
export default class Seller {
  // add(route: TRoute) {
  //   routeStore.routes.push(route)
  // }

  boot() {
    const route = getPlugin(Route)
    // route.add({
    //   path: "/",
    //   exact: true,
    //   component: Home
    // })
    // console.log('Route Boot')
  }
}