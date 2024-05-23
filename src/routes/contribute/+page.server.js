import * as db from '$lib/server/database.js';

export const actions = {
    upload: async ({cookies, request}) => {
        const data = await request.formData();
        console.log(`form data:`, data);
        
        db.addEntry({
            address:data.get('address-street'),
            city: data.get('address-city'),
            state: data.get('address-state'),
            zipcode: data.get('address-zipcode'),
            report: data.get('report'),
            comment:data.get('comment')
        })

    }
}