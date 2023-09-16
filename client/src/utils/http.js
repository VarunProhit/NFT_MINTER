class HTTPClient {
	baseUrl = "http://localhost:8080/api";

	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async get(endpoint) {
		try {
			const res = await fetch(`${this.baseUrl}${endpoint}`);
			const response = await res.json();
			return Promise.resolve(response);
		} catch (error) {
			console.error("HTTP Client " + error);
			return Promise.reject(error);
		}
	}

	async post(endpoint, body, headers) {
		try {
			const res = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			});
			const response = await res.json();
			return Promise.resolve(response);
		} catch (error) {
			console.error("HTTP Client " + error);
			return Promise.reject(error);
		}
	}

	async patch(endpoint, body, headers) {
		try {
			const res = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "PATCH",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			});
			const response = await res.json();
			return Promise.resolve(response);
		} catch (error) {
			console.error("HTTP Client " + error);
			return Promise.reject(error);
		}
	}

	async delete(endpoint, body, headers) {
		try {
			const res = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "DELETE",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			});
			const response = await res.json();
			return Promise.resolve(response);
		} catch (error) {
			console.error("HTTP Client " + error);
			return Promise.reject(error);
		}
	}
}

export default HTTPClient;
