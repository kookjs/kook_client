import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useQuery, useLazyQuery, useMutation, gql, useApolloClient } from "@apollo/client";
import {Loading, LoadingElement} from "@kookjs-client/core/components/shared/Loading";
import ErrorLabel from "@kookjs-client/core/components/shared/ErrorLabel";
import { ApolloError } from '@apollo/client';
import { KookErrorParser } from '@kookjs-client/core'
import { FORGOT_PASSWORD } from "../query";
import toastr from 'toastr'
import dotObject from '@khanakiajs/dot-object'
import { message } from "antd";

export default function Login(props) {
	const loadingEl = useRef<LoadingElement>();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			username: 'khanakia@gmail.com'
		}
	});
	const client = useApolloClient();

	const onSubmit_ = async (formData) => {
		console.log(formData);

		loadingEl.current.show()
		client.mutate({
			mutation: FORGOT_PASSWORD,
			variables: {
			
					username: formData.username

			}
		}).then((res) => {	
			console.log(res)
			const note = dotObject.get(res, 'data.authForgotPassword', 'We have sent you an email.')
			message.success(note)
			history.push('/auth/reset_password')
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
				<h2 className="heading">Forgot Password</h2>

				<div className="form-group">
					<label>Username or Email</label>
					<input
            type="text"
						name="username"
						className="form-control"
						ref={register({ required: true })}
					/>
					<ErrorLabel field={errors.username} />
				</div>
				<input
					type="submit"
					className="btn btn-primary btn-block mt-2"
				/>
			</div>
		</form>
	);
}