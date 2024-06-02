import * as db from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';

export async function load({url}) {
    console.log(url);
	const query = url.searchParams.get('q');
	const matchedProperties = await db.searchProperty(query);
	console.log(matchedProperties);
	if (matchedProperties.length===1) {
		redirect(302, `/property/${matchedProperties[0].address_id}`)
	} else {
		return {
			searchResults: matchedProperties,
			searchQuery: query
		};
	}
}