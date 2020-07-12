import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useQuery, useLazyQuery, useMutation, gql, useApolloClient } from "@apollo/client";
import {Loading, LoadingElement} from "@kookjs-client/core/components/shared/Loading";
import ErrorLabel from "@kookjs-client/core/components/shared/ErrorLabel";
import { ApolloError } from '@apollo/client';
import { KookErrorParser } from '@kookjs-client/core'
import { AUTH_LOGIN } from "../query";
import toastr from 'toastr'

export default function Login(props) {
	const loadingEl = useRef<LoadingElement>();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			username: 'khanakia@gmail.com',
			password: 'admin'
		}
	});
	const client = useApolloClient();

	// const [authLogin, { loading: mutateLoading, error: mutateError }] = useMutation(AUTH_LOGIN);

	const onSubmit_ = async (formData) => {
		console.log(formData);

		loadingEl.current.show()
		client.mutate({
			mutation: AUTH_LOGIN,
			variables: {
				args: {
					username: formData.username,
					password: formData.password,
				}
			}
		}).then((res) => {
			history.push('/')
			console.log(res)
		})
		.catch((err: ApolloError) => {
			const errorParser = new KookErrorParser(err)
			// console.log(err1.message)
			// console.log(err1.code)
			// console.log(err1.data)
			// console.log(err1.originalMessage)
			toastr.error(errorParser.message)
		}).finally(() => {
			// console.log('IFNNNN')
			loadingEl.current.hide()
		})
	};

	return (
		<form onSubmit={handleSubmit(onSubmit_)} className="uform uform-vertical">
			<Loading ref={loadingEl} overlay />
			<div className="inner">
				<h2 className="heading">Sign In</h2>

				<div className="form-group">
					<label>Email</label>
					<input type="email" name="username" className="form-control" ref={register({ required: true })} />
					<ErrorLabel field={errors.password} />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input type="password" name="password" className="form-control" ref={register({ required: true })} />
					<ErrorLabel field={errors.password} />
				</div>

				<input type="submit" className="btn btn-primary btn-block mt-2" value="Sign In" />

				<div className="mt-4">
					<Link className="" to={"/auth/register"}>
						Don't have an account ?
					</Link>
					<div className="text-right">
						<Link className="login-form-forgot" to={"/auth/forgot_password"}>
							Forgot Password
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
}
