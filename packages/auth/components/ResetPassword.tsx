import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useQuery, useLazyQuery, useMutation, gql, useApolloClient } from "@apollo/client";
import {Loading, LoadingElement} from "@kookjs-client/core/components/shared/Loading";
import ErrorLabel from "@kookjs-client/core/components/shared/ErrorLabel";
import { ApolloError } from '@apollo/client';
import { KookErrorParser } from '@kookjs-client/core'
import { RESET_PASSWORD } from "../query";
import toastr from 'toastr'

export default function Login(props) {
	const loadingEl = useRef<LoadingElement>();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			currentPassword: null,
      password: null,
      confirmPassword: null
		}
	});
	const client = useApolloClient();

	const onSubmit_ = async (formData) => {
		console.log(formData);

		loadingEl.current.show()
		client.mutate({
			mutation: RESET_PASSWORD,
			variables: {
				args: {
					token: formData.token,
          password: formData.password
				}
			}
		}).then((res) => {
			history.push('/login')
			console.log(res)
		})
		.catch((err: ApolloError) => {
			const errorParser = new KookErrorParser(err)
			toastr.error(errorParser.message)
		}).finally(() => {
			loadingEl.current.hide()
		})
	};

	return (
    <form onSubmit={handleSubmit(onSubmit_)} className="uform uform-vertical">
      <Loading ref={loadingEl} overlay />
      <div className="inner">
        <h2 className="heading">Reset Password</h2>

        <div className="form-group">
          <label>Enter Reset Token</label>
          <input
            type="text"
            name="token"
            className="form-control"
            ref={register({ required: true })}
          />
          <div className="note">We sent you token your registered email.</div>
          <ErrorLabel field={errors.token} />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            ref={register({ required: true })}
          />
          <ErrorLabel field={errors.password} />
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block mt-2"
        />
      </div>
    </form>
	);
}