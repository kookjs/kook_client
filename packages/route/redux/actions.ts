import uuid from "uuid";
import { Route } from "./types";
import {
  ADD_ROUTE,
  RouteActionTypes,
  REMOVE_ROUTE,
  EDIT_ROUTE,
  SET_ROUTES
} from "./types";
// import { Dispatch } from "redux";
// import { AppState } from "../store/configureStore";

export const addRoute = (route: Route): RouteActionTypes => ({
  type: ADD_ROUTE,
  route
});

export const removeRoute = (path: string): RouteActionTypes => ({
  type: REMOVE_ROUTE,
  path
});

export const editRoute = (route: Route): RouteActionTypes => ({
  type: EDIT_ROUTE,
  route
});

export const setRoutes = (routes: Route[]): RouteActionTypes => ({
  type: SET_ROUTES,
  routes
});