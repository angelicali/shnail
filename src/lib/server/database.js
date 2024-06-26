import { db, sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import {error} from '@sveltejs/kit';

export async function getAddresses() {
    // TODO: get the most recently modified addresses
    const { rows } = await sql`
        SELECT address_id, full_address
        FROM addresses
        ORDER BY address_id DESC
        LIMIT 100`;
    return rows;
}

export async function getPropertyDetailsById(address_id) {
    const client = await db.connect();
    try {
        let { rows } = await client.sql`
            SELECT full_address FROM addresses WHERE address_id = ${address_id}`;
        const fullAddress = rows[0].full_address;
        ({ rows } = await client.sql`
            SELECT ts, comment, report_urls FROM uploads WHERE address_id = ${address_id}
            ORDER BY ts DESC`);
        return {
            full_address: fullAddress,
            uploads: rows
        };
    } catch (e) {
        error(e);
    } finally {
        client.release();
    }
}

export async function searchProperty(query) {
    const matchStr = `%${query.toUpperCase()}%`;
    console.log(`match string is ${matchStr}`);
    let { rows } = await sql`
        SELECT address_id, full_address
        FROM addresses
        WHERE full_address LIKE ${matchStr}`;
    console.log(rows);
    return rows;
}


export async function uploadBlob(file) {
    const { url } = await put(file.name, file, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN
    });
    return url;
}

export async function uploadBlobBatch(files) {
    const urls = [];
    await Promise.all(files.map(async (file) => {
        const { url } = await put(file.name, file, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });
        console.log(`file uploaded to blob: ${url}`);
        urls.push(url);
    }));
    return urls;
}

export async function addEntryToPostgres(formSubmission) {
    console.log('Adding entry to postgres');
    let { address, city, state, zipcode, reports, email, comment } = formSubmission;
    address = address.toUpperCase();
    city = city.toUpperCase();
    const fullAddress = `${address}, ${city}, ${state} ${zipcode}`;
    let matchedAddressId, queryResult;
    console.log('Connecting to DB');
    const client = await db.connect();
    console.log('Connected to DB');
    try {
        // Check if the address already exists in the addresses table.
        queryResult = await client.sql`
                SELECT address_id
                FROM addresses
                WHERE street_address = ${address}
                AND city = ${city}
                AND state = ${state}
                AND zipcode = ${zipcode}`;
        // FOR UPDATE`; // Lock the row for update to prevent race conditions
        console.log(queryResult);
        if (queryResult.rowCount > 0) {
            console.log(`found address in database! Query result:`, queryResult);
            matchedAddressId = queryResult.rows[0].address_id;
        } else {
            console.log(`will insert address to database`);
            // If address_id is NULL, it means the address doesn't exist. Insert the new address.
            const { rows } = await client.sql`
                    INSERT INTO addresses (street_address, city, state, zipcode, full_address)
                    VALUES (${address}, ${city}, ${state}, ${zipcode}, ${fullAddress})
                    RETURNING address_id`;
            console.log(`inserted address to database:`);
            console.log(rows);
            matchedAddressId = rows[0].address_id;
        }

        // Now that we have the address_id, we can insert the upload record.
        console.log(`Adding uploads entry for address_id ${matchedAddressId} and report_urls `, reports);
        await client.sql`
            INSERT INTO uploads (report_urls, ts, email, address_id, comment)
                VALUES (${reports}, CURRENT_TIMESTAMP, ${email}, ${matchedAddressId}, ${comment})`;
        console.log(`inserting into uploads complete`);
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        client.release();
    }
    return {
        success: true,
        address_id: matchedAddressId
    };
}