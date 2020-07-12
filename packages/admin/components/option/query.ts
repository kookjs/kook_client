import { gql } from '@apollo/client';

export const QUERY_OPTIONS = gql`
	query Options($meta: MetaInput) {
		options(meta: $meta) {
			meta {
				total
				page
				limit
				orderBy {
					key
					value
				}
			}
			items {
				id
				key
				value
			}
		}
	}
`;


export const UPDATE_OPTION = gql`
  mutation OptionUpdate($args: OptionInput!) {
    optionUpdate(args: $args) {
				id
				key
				value	
		}
  }
`;

export const QUERY_OPTION = gql`
	query Option($id: Float!) {
		option(id: $id) {
				id
				key
				value	
		}
	}
`;