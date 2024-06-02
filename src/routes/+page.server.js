import * as db from '$lib/server/database.js'

export async function load() {
    const addresses = await db.getAddresses();
    return {
        addresses: addresses
    }
}