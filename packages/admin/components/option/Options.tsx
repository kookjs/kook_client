import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useApolloClient } from "@apollo/client";
import { Table, PageHeader } from "antd";

import {
	useQueryParams,
	useQueryParam,
  StringParam,
  NumberParam,
	ArrayParam,
	JsonParam,
  withDefault,
} from 'use-query-params';

import dotObject from '@khanakiajs/dot-object'

import { QUERY_OPTIONS } from './query'

import { setting } from './contants'

import AntColumnSearch from '@kookjs-client/core/components/shared/AntColumnSearch'
import { filter } from "lodash";
const antColumnSearch = new AntColumnSearch()

const columns = [
	{
		title: "",
		key: "action",
		render: (text, record) => (
			<span>
				<Link to={`/${setting.slugPlural}/${record.id}`}>Edit</Link>
			</span>
		),
		width: 50,
	},

	{
		title: "Id",
		dataIndex: "id",
		key: "id",
		sorter: true,
	},

	{
		title: "Key",
		dataIndex: "key",
		key: "key",
		sorter: true,
		...antColumnSearch.getProps('key')
	},

	{
		title: "Value",
		dataIndex: "value",
		key: "value",
		sorter: true,
	},
];

export default () => {
	const [query, setQuery] = useQueryParams({
		page: withDefault(NumberParam, 1),
		limit: withDefault(NumberParam, 10),
		orderBy: withDefault(JsonParam, []),
  });
	const { page, limit, orderBy } = query;
	
	const [items, setItems] = useState([]);
	
	const [total, setTotal] = useState(0);

	const [meta, setMeta] = useState({
		page: page,
		limit: 10,
		total: 10,
	});

	const client = useApolloClient();

	const fetch = async () => {
		// console.log(page, limit)
		// console.log(orderBy)
		const response = await client.query({
			query: QUERY_OPTIONS,
			variables: {
				meta: {
					page,
					limit,
					orderBy
				},
				// filters
			},
			// fetchPolicy: 'network-only'
		});
		// console.log(response)
		const items = dotObject.getArrayValue(response, ['data', setting.slugPlural, 'items'], []);
		// console.log(items)
		const metaRes = dotObject.getArrayValue(response, ['data', setting.slugPlural, 'meta'], meta);
		// console.log(metaRes)
		setItems(items);
		// setMeta(metaRes);
		setTotal(metaRes.total)
	};

	const getSortOrder = (order) => {
		return order == "descend" ? "DESC" : "ASC";
	};

	const handleTableChange = (pagination, filters, sorter) => {
		let metad = {
			limit: pagination.pageSize,
			page: pagination.current,
		};

		if (sorter.field) {
			metad["orderBy"] = [
				{
					key: sorter.field,
					value: getSortOrder(sorter.order),
				},
			];
		}

		// console.log(metad["orderBy"])

		console.log(filters)

		setQuery(
			metad
		)

		// fetch();
	};

	useEffect(() => {
		fetch();
	}, [page, limit, orderBy]);

	const pagination = {
		current: page,
		pageSize: limit,
		total: total,
	};

	// console.log(pagination)

	/* OLD WAY I WAS DOING LIKE THIS SO DO NOT DELETE */
	// const history = useHistory();
	// const { loading, error, data, refetch } = useQuery(QUERY_ORDERS);
	// useEffect(() => {
	// 	refetch();
	// });
	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error :(</p>;
	// const items = data.orders || [];
	// console.log(page)
	return (
		<div className="page">
			<PageHeader
        className="pageheader1"
        title={setting.pluralTitle}
        extra={[
          <Link key={1} className="btn btn-primary btn-sm" to={`/${setting.slugPlural}/add`}>Add New</Link>
        ]}
      />
			<Table
				className="ktable"
				dataSource={items}
				columns={columns}
				scroll={{ x: 1000 }}
				size={"small"}
				pagination={pagination}
				rowKey="id"
				onChange={handleTableChange}
			/>
		</div>
	);
}