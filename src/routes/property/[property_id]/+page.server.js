import * as db from '$lib/server/database.js';
import {error} from '@sveltejs/kit';

export async function load({params}) {
    const property = await db.getPropertyDetailsById(params.property_id);
    console.log("On [property_id] page load. Params:", params, "Property", property);
    if (!property) throw error(404);
    return {
        property: property,
    };
}