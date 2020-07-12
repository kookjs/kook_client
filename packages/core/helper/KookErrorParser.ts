import { ApolloError } from "@apollo/client";
import { get } from "lodash";
import { capitalize } from '../util'

export class KookErrorParser {
	public originalError: ApolloError;
	public originalMessage: string; // Oringal Message returned by the server
	public code: any;
	public data: any;
	public message: string; // formated error

	constructor(error: ApolloError) {
		this.originalError = error;
		this.originalMessage = KookErrorParser.extractFirstMessage(error);
		this.code = KookErrorParser.extractFirstCode(error);
		this.data = KookErrorParser.extractFirstData(error);
		this.message = this.getMessage();
	}

	getMessage() {
		// Never show the user the original message if it's a server error
		if (this.code == "INTERNAL_SERVER_ERROR") {
			return "Server Error.";
		}

		if (this.code == "ARGUMENT_VALIDATION_FAILED") {
			const constraints = get(this.data, "validationErrors[0].constraints");
			const message = constraints[Object.keys(constraints)[0]];
			console.log("sdfsd")
			if (message) return capitalize(message);
		}

		if (this.code == "GRAPHQL_VALIDATION_FAILED") {
			return "Validation failed.";
		}

		return this.originalMessage;
	}

	static extractFirstMessage(e) {
		//  console.log(e.networkError.result.errors[0]['message'])
		//  console.log(get(e, 'networkError.result.errors[0].message'))
		const errorPaths = [
			"graphQLErrors[0].message", // All the validation error will occur here
			"networkError.result.errors[0].message",
			"response.errors[0].message",
			"message",
		];
		const path = errorPaths.find((path) => get(e, path));
		// console.log(get(e, path))
		return get(e, path);
	}

	static extractFirstCode(e) {
		const errorPaths = [
			"graphQLErrors[0].extensions.code", // All the validation error will occur here
			"networkError.result.errors[0].extensions.code",
			"response.errors[0].extensions.code",
		];
		const path = errorPaths.find((path) => get(e, path));
		// console.log(path)
		return get(e, path);
	}

	static extractFirstData(e) {
		const errorPaths = [
			"graphQLErrors[0].extensions.exception", // All the validation error will occur here
			"networkError.result.errors[0].extensions.exception",
			"response.errors[0].extensions.exception",
		];
		const path = errorPaths.find((path) => get(e, path));
		// console.log(path)
		return get(e, path);
	}
}