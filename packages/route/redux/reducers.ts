import { Route } from "./types";
import {
  RouteActionTypes,
  ADD_ROUTE,
  REMOVE_ROUTE,
  EDIT_ROUTE,
  SET_ROUTES
} from './types'

const routeReducerDefaultState: Route[] = [];

const routeReducer = (state = routeReducerDefaultState, action: RouteActionTypes): Route[] => {
  switch (action.type) {
    case ADD_ROUTE:
      return [...state, action.route]
        break;
      case REMOVE_ROUTE:
        return state.filter(({ path }) => path !== action.path);
      case EDIT_ROUTE:
        return state.map(route => {
          if (route.path === action.route.path) {
            return {
              ...route,
              ...action.route
            };
          } else {
          return route;
        }
      });
    case SET_ROUTES:
      return action.routes;

    default:
      return state
  }
}

export { routeReducer };