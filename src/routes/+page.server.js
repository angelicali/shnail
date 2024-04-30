// import {properties} from '$lib/server/data.js'
import * as db from '$lib/server/database.js'

export function load() {
    const properties = db.getPropertyList();
    return {
        addresses: [...properties.values()].map((property) => ({
            id: property.id,
            address: property.address
        }))
    }
}