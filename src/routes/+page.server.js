import * as db from '$lib/server/database.js'

export async function load() {
    const addresses = await db.getAddresses();
    // const filteredAddresses = addresses.filter((address) => !address.full_address.startsWith('TEST'));

    return {
        addresses: addresses
    }
}