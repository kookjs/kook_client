import React, { Component } from "react";
import { Input, Button } from "antd";

import { SearchOutlined } from "@ant-design/icons";

export default class AntColumnSearch {
	public searchInput: Input;
	constructor(parent = null) {
		// this.parent = parent
		// this.searchInput = ''
	}

	state = {
		searchText: "",
	};

	getProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					// icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
		// onFilter: (value, record) => {

		//     if(!record[dataIndex]) return (value, record)
		//     record[dataIndex]
		//     .toString()
		//     .toLowerCase()
		//     .includes(value.toLowerCase())
		//     return (value, record)
		// }
		//  ,
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) => {
			// if(!text) return
			return <div>{text}</div>;
		},
	});

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		// this.parent.setState({ searchText: selectedKeys[0] });
	};

	handleReset = (clearFilters) => {
		clearFilters();
		// this.parent.setState({ searchText: '' });
	};
}
