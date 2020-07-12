import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, Input, Button, message } from 'antd';

import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import { ApolloError } from '@apollo/client';

import { antFormLayout, antFormTailLayout } from '@kookjs-client/core'
import {Loading, LoadingElement} from "@kookjs-client/core/components/shared/Loading";

// import { UpdateOption, UpdateOptionVariables } from './__generated__/UpdateOption'
import { extractFirstError, extractErrors } from '../../ErrorHelper'
import { QUERY_OPTION, UPDATE_OPTION } from './query'
import { setting } from './contants'

const Service = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();

  const [getOption, { loading: queryLoading, error: queryError, data }] = useLazyQuery(
    QUERY_OPTION, {
      variables: {
        id: parseInt(id)
      }
    }
  );
  
  const [updateOption, { loading: mutateLoading, error: mutateError }] = useMutation(UPDATE_OPTION);

  const onFinish = values => {
    // values['description'] = description
    console.log('Success:', values);

    updateOption({ variables: { args: values } }).then((res) => {
      message.success('Updated successfully.')
      // history.push('/options')
      history.goBack()
    }).catch((err: ApolloError) => {
      // console.log(extractErrors(err))
      message.error('Validation Error.')
    });

    // loadingEl.current.show()
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('Validation Error.')
  };

  const fetch = async () => {
    // console.log(id);
    if (!id) return;
    getOption(id)
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if(data && data.option) {
      form.setFieldsValue(data.option);
    }
  }, [data]);

  if (queryLoading || mutateLoading) return <Loading overlay show={true} />;
  if (queryError) return <p>Error :(</p>;

  return (
    <React.Fragment>
      {/* <Loading ref={loadingEl} overlay /> */}
      
      <PageHeader
        className="pageheader1"
        title={setting.singularTitle}
      />

    <Form
      form={form}
      {...antFormLayout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        label="Key"
        name="key"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <Input disabled={id} />
      </Form.Item>

      <Form.Item
        label="Value"
        name="value"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...antFormTailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </React.Fragment>
  );
};

export default Service;