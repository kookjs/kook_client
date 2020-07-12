import { injectable, inject } from "inversify";
// import { createStore } from 'redux'
// import { TRoute, routeStore } from './store'
import { getPlugin } from '@kookjs-client/core'
import Route from '@kookjs-client/route'

import Home from './components/Home'
import Option from './components/option/Option'
import Options from './components/option/Options'
// import OptionView from './components/option/OptionView'

@injectable()
export default class Admin {
  // add(route: TRoute) {
  //   routeStore.routes.push(route)
  // }

  boot() {
    const route = getPlugin(Route)
    route.add({
      path: "/",
      exact: true,
      component: Home
    })

    route.add({
      path: "/options/add",
      exact: true,
      component: Option
    })

    route.add({
      path: "/options",
      exact: true,
      component: Options
    })

    route.add({
      path: "/options/:id",
      exact: true,
      component: Option
    })
    // console.log('Route Boot')
  }
}