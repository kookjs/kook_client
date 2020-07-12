import { injectable, inject } from "inversify";
// import { createStore } from 'redux'
import { TRoute, routeStore } from './store'

@injectable()
export default class Route {
  hello() {
    console.log('hello')
  }

  add(route: TRoute) {
    routeStore.routes.push(route)
  }

  boot() {
    // this.add({
    //   path: "/home",
		//   exact: true,
    // })
    // console.log('Route Boot')
  }
}