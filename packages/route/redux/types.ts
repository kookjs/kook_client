export interface Route {
  path: string;
  exact: boolean;
  // component: stiring;
  // layout: 'admin'null;
  // showInMenu: falsenull;
  // title: null;
  // priority: 10null;
  // iconClass: null;
  // iconUrl: null;
  // private: false
}


// action strings
export const ADD_ROUTE = "ADD_ROUTE";
export const EDIT_ROUTE = "EDIT_ROUTE";
export const REMOVE_ROUTE = "REMOVE_ROUTE";
export const SET_ROUTES = "SET_ROUTES";

export interface SetRouteAction {
  type: typeof SET_ROUTES;
  routes: Route[];
}

export interface EditRouteAction {
  type: typeof EDIT_ROUTE;
  route: Route;
}

export interface RemoveRouteAction {
  type: typeof REMOVE_ROUTE;
  path: string;
}

export interface AddRouteAction {
  type: typeof ADD_ROUTE;
  route: Route;
}

export type RouteActionTypes =
  | SetRouteAction
  | EditRouteAction
  | RemoveRouteAction
  | AddRouteAction;

// export type AppActions = RouteActionTypes;
