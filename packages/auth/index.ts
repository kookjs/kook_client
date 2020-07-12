import { injectable, inject } from "inversify";
// import { createStore } from 'redux'
// import { TRoute, routeStore } from './store'
import { getApp, getPlugin } from '@kookjs-client/core'
import Route from '@kookjs-client/route'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

import Login from './components/Login'
import ChangePassword from './components/ChangePassword'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Register from './components/Register'

@injectable()
export default class Auth {
  // add(route: TRoute) {
  //   routeStore.routes.push(route)
  // }

  boot() {
    const route = getPlugin(Route)

    route.add({
      path: "/auth/register",
      exact: true,
      component: Register,
      layoutCssClass: 'center'
    })

    route.add({
      path: "/login",
      exact: true,
      component: Login,
      layoutCssClass: 'center'
    })

    route.add({
      path: "/change_password",
      exact: true,
      component: ChangePassword,
      layoutCssClass: 'center'
    })

    route.add({
      path: "/auth/forgot_password",
      exact: true,
      component: ForgotPassword,
      layoutCssClass: 'center'
    })

    route.add({
      path: "/auth/reset_password",
      exact: true,
      component: ResetPassword,
      layoutCssClass: 'center'
    })
    // console.log('Auth Boot')
  }

  getToken() {
    return Cookies.get('token')
  }

  getTokenDecoded(): any {
    const decoded = jwtDecode(this.getToken())
    return decoded
  }

  isTokenExpired() {
    const decoded = this.getTokenDecoded()
    if(!decoded) return true
    if (Date.now() <= decoded.exp * 1000) {
      return false
    } else { 
      return true
    }
  }

  getTokenExpirationDate() {
    const decoded = this.getTokenDecoded()
    if(!decoded) return null
    return new Date(decoded.exp * 1000)
  }

  isUserLoggedIn() {
    if(this.getToken() && !this.isTokenExpired()) return true
    return false
  }

  logout() {
		Cookies.remove('token')
  }
  
  getUserID() {
		const data = this.getTokenDecoded();
		return data.id;
  }
  
  getUserEmail() {
		const data = this.getTokenDecoded();
		return data.email;
	}
}