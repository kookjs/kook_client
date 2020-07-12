import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, Input, Button, Select, InputNumber, Switch, message } from 'antd';
import dotProp from 'dot-prop'
// import { serviceShow, serviceCreate, serviceUpdate } from '../../api'

import Loading from '@kookjs-client/core/components/shared/Loading'

// import {layout, layout1, tailLayout } from '../../constant'

import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';

// import { UpdateOption, UpdateOptionVariables } from './__generated__/UpdateOption'


export const QUERY_OPTION = gql`
query Options($id: Float! ) {
    option(id: $id) {
      id
      key
      value
    }
	}
`;

export default () => {
  let { id } = useParams();
  const [form] = Form.useForm();

  const history = useHistory();

  const loadingEl = useRef()

  const [item, setItem] = useState({});
  
  const client = useApolloClient()
  const fetch = async () => {
    // console.log(id);
    if (!id) return;
    const response = await client.query({
      query: QUERY_OPTION,
      variables: {
				id: parseInt(id)
			},
      // fetchPolicy: 'cache-only'
    });

    console.log(response)

    // const response = await serviceShow(id)
    const item = dotProp.get(response, 'data.option', {});
    console.log(item)

    // await fetchIcons(item['categoryId'])
    // // console.log(item)
    setItem(item)
    // // form.setFieldsValue(item);
    // form.setFieldsValue(item);
    // setDescription(item.description)
  }

  // const fetchIcons = async (id) => {
  //   // console.log(id);
  //   if (!id) return;
  //   const response = await apiCategoryIconList({
  //     filters: {
  //       categoryId: id
  //     }
  //   })
  //   const icons = dotProp.get(response, 'data.results', []);
  //   setServiceIcons(icons)
  // }

  // const onCategoryChange = async (id) => {
  //   // console.log(item)
  //   await fetchIcons(id)
  //   form.setFieldsValue({
  //     iconName: ''
  //   });
    
  // }

  useEffect(() => {  
    fetch();
  }, []);
  

  return (
    <React.Fragment>
      <div>
        ID: 
        {item.id}
      </div>
    </React.Fragment>
  );
};
