import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useApolloClient } from "@apollo/client";
import {Loading, LoadingElement} from "@kookjs-client/core/components/shared/Loading";
import ErrorLabel from "@kookjs-client/core/components/shared/ErrorLabel";
import { ApolloError } from '@apollo/client';
import { KookErrorParser } from '@kookjs-client/core'
import { CHANGE_PASSWORD } from "../query";
import toastr from 'toastr'

export default function Login() {
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
			mutation: CHANGE_PASSWORD,
			variables: {
				args: {
					currentPassword: formData.currentPassword,
          password: formData.password,
          confirmPassword: formData.confirmPassword
				}
			}
		}).then((res) => {
			history.push('/')
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
        <h2 className="heading">Change Password</h2>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            className="form-control"
            // placeholder="Current Password"
            ref={register({ required: true })}
          />
          <ErrorLabel field={errors.currentPassword} />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            // placeholder="New Password"
            ref={register({ required: true })}
          />
          <ErrorLabel field={errors.password} />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            // placeholder="New Password"
            ref={register({ required: true })}
          />
          <ErrorLabel field={errors.confirmPassword} />
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block mt-2"
        />
      </div>
    </form>
	);
}
