import { injectable } from "inversify";
// import { createStore } from 'redux'
import { TRoute, routeStore } from './store'

@injectable()
export default class Route {
  add(route: TRoute) {
    routeStore.routes.push(route)
  }

  boot() {
    
  }
}