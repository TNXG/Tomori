import {
	AggregateController,
	NoteController,
	PageController,
	PostController,
	CategoryController,
	createClient,
	SnippetController,
	AIController,
} from "@mx-space/api-client";

import { config } from "dotenv";

config();

import { fetchAdaptor } from "@mx-space/api-client/dist/adaptors/fetch";

export const apiClient = () => {
	const apiEndpoint = process.env.api_endpoint;

	if (!apiEndpoint) {
		throw new Error(
			"API endpoint is not defined in the environment variables.",
		);
	}

	const apiClient = createClient(fetchAdaptor)(apiEndpoint, {
		controllers: [
			PostController,
			NoteController,
			PageController,
			CategoryController,
			AggregateController,
			SnippetController,
			AIController,
		],
	});

	return apiClient;
};
