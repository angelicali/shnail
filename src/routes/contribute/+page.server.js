import * as db from '$lib/server/database.js';
import { json, fail, redirect, error } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies, request }) => {
        const form = await request.formData();

        const formSubmission = {
            address: form.get('address-street'),
            city: form.get('address-city'),
            state: form.get('address-state'),
            zipcode: form.get('address-zipcode'),
            comment: form.get('comment'),
            reports: form.getAll('blob-url'),
            email: form.get('email')
        }
        if (!form.has('blob-url') && !form.has('comment')) {
            console.error('Form has neither blob url nor comment!! Will not alter database.');
            return;
        }

        const result = await db.addEntryToPostgres(formSubmission);
        console.log(result);
        if (result.success) {
            redirect(302, `/property/${result.address_id}`);
        } else {
            error(500, {message: "Updating PostgreSQL DB failed!"});
        }
    }
}