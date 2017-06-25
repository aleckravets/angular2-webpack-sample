interface Window { gapiLoaded: any; }

declare namespace gapi.client.drive {
	class FilesResource {
		id: string;
		name: string;
		mimeType: string;
		parents: string[];
	}

	class FilesListResponse {
		error: { message: string, code: number };
		nextPageToken: string;
		files: FilesResource[];
	}

	export var files: {
		list(params: any): HttpRequest<any>;
		get(params: any): HttpRequest<any>;
	};

	export var about: any;
}

