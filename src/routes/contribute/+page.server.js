import * as db from '$lib/server/database.js';

export const actions = {
    upload: async ({cookies, request}) => {
        const data = await request.formData();
        console.log(`form data:`, data);
        db.addComment({
            address:data.get('address'),
            comment:data.get('comment')
        })
    }
}