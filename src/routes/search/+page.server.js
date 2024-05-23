import * as db from '$lib/server/database.js';

export async function load({url}) {
    console.log(url);
	const address = url.searchParams.get('q');
	const matchedProperties = db.findPropertyByAddress(address);
	return {
		serverMessage: 'hello from server load function',
        searchResults: matchedProperties,
		searchQuery: address
	};
}