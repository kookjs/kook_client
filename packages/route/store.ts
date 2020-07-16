import React from 'react'
import { observable } from 'mobx';
// import { observer, useLocalStore } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0

export type TRoute = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
  priority?: number;

  // Layout Props
  layoutCssClass?: string;  
  layoutName?: string;  
  
  // For AUTH purpose only
  authenticate?: boolean;
  roles?: string[];
  capabilites?: string[];
  
  // page title
  title?: string; 
}

export const routeStore = observable({
    routes: [] as TRoute[],  
})