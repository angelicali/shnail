import * as db from '$lib/server/database.js';
import {json} from '@sveltejs/kit';

export const actions = {
    upload: async ({cookies, request}) => {
        const form = await request.formData();

        const formSubmission = {
            address:form.get('address-street'),
            city: form.get('address-city'),
            state: form.get('address-state'),
            zipcode: form.get('address-zipcode'),
            reports: [],
            email: form.get('email')
        }
        if (!form.has('report')) {
            console.error('no file uploaded!! Will not alter database.');
            return;
        }

        // TODO: upload more than first file
        const url = await db.uploadBlob(form.get('report'));
        formSubmission.reports.push(url);
        const result = db.addEntryToPostgres(formSubmission);
        console.log(result);
        return;      
    }
}