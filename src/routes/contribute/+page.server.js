import * as db from '$lib/server/database.js';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'


export const actions = {
    upload: async ({cookies, request}) => {
        const form = await request.formData();
        console.log(`form data:`, form);

        const formSubmission = {
            address:form.get('address-street'),
            city: form.get('address-city'),
            state: form.get('address-state'),
            zipcode: form.get('address-zipcode'),
            reports: [],
            comment:form.get('comment')
        }
        if (!form.has('report')) {
            db.addEntry(formSubmission); 
            console.log('no files uploaded');
            return;
        }

        // TODO: upload more than first file
        const file = form.get('report');
        const {url} = await put(file.name, file, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });
        formSubmission.reports.push(url);
        db.addEntry(formSubmission);      

    }
}