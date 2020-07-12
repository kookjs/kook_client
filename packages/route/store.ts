import React from 'react'
import { observable, action } from 'mobx';
import { observer, useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0


export type TRoute = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
  layoutCssClass?: string;
  // layout: 'admin'null;
  // showInMenu: falsenull;
  // title: null;
  priority?: number;
  // iconClass: null;
  // iconUrl: null;
  // private: false
}

export const routeStore = observable({
  // note the use of this which refers to observable instance of the store

    routes: [] as TRoute[],  
})