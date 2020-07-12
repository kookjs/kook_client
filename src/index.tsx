const style = require('./assets/scss/app.module.scss')
// import styles from './assets/scss/app.module.scss';

import "reflect-metadata";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route as ReactRoute } from "react-router-dom";
import { createApp, getPlugin } from "@kookjs-client/core";
import Route from "@kookjs-client/route";
import Auth from "@kookjs-client/auth";
import Admin from "@kookjs-client/admin";
import Seller from "@kookjs-client/seller";
import { QueryParamProvider } from 'use-query-params';

import AppComp from './App'
const app = createApp();

import { from, ApolloClient, HttpLink, ApolloProvider, InMemoryCache } from '@apollo/client';


const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       option(_, { args, toReference }) {
  //         return toReference({
  //           __typename: "Option",
  //           id: args.id,
  //         });
  //       },
  //     },
  //   },
  // },
})

import { onError } from "@apollo/link-error";

const errorLink = onError(({ forward, operation, response, graphQLErrors, networkError }) => {
  // if (graphQLErrors)
  //   graphQLErrors.map(({ message, locations, path }) =>
  //     console.log(
  //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //     )
  //   );
  if (networkError) console.log(`[Network error]: ${networkError}`);

  // console.log(response.errors)
  // console.log(response.data)

  // return forward(operation)
  // throw new Error('UCUCUCUCUU')
});


const httpLink = new HttpLink({
  uri: 'http://localhost:7001/graphql',
  credentials: 'include'
})

const client = new ApolloClient({
  cache: cache,
  link: from([
    errorLink,
    httpLink
  ]),

  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    }
  }



});

const main = async () => {
	app.registerPlugin(Route);
	app.registerPlugin(Auth);
	app.registerPlugin(Admin);
	app.registerPlugin(Seller);
	await app.boot();
  console.log("App booted.");
  
  // window.Auth = getPlugin(Auth)

	render(
			<ApolloProvider client={client}>
				<BrowserRouter>
          <QueryParamProvider ReactRouterRoute={ReactRoute}>

					<AppComp />
          </QueryParamProvider>
				</BrowserRouter>
			</ApolloProvider>
    ,
		document.getElementById("root")
	);
};

main();

