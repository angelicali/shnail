import * as db from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';

export async function load({url}) {
    console.log(url);
	const query = url.searchParams.get('q');
	const matchedProperties = await db.searchProperty(query);
    // const filteredAddresses = matchedProperties.filter((address) => !address.full_address.startsWith('TEST'));

	// Removing this feature for now because users might not want redirect if there's only one report for their state.
	// if (matchedProperties.length===1) {
	// 	console.log('Found an exact match!');
	// 	redirect(302, `/property/${matchedProperties.rows[0].address_id}`)
	// } else {
		return {
			searchResults: matchedProperties,
			searchQuery: query
		};
	// }
}