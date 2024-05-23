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

// export const actions = {
//     search: async ({cookies, request}) => {
//         const data = await request.formData();
//         console.log(`search form data:`, data);
//         const res = await fetch(`/api/search/${data.address}`);
//         const searchResults = res.json();
        
//         // If zero match
//         if (searchResults.length === 0) {
//             // return not found message!
//         }
//         // If only one match
//         else if (searchResults.length === 1) {
//             // redirect to property page
//         } else {
//             // list all matched properties
//         }
//     }
// }