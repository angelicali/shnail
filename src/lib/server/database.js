import { db, sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function getAddresses() {
    // TODO: get the most recently modified addresses
    const {rows} = await sql`
        SELECT address_id, full_address
        FROM addresses
        ORDER BY address_id DESC
        LIMIT 100`;
    return rows;
}

export async function getPropertyDetailsById(address_id) {
    const client = await db.connect();
    let {rows} = await client.sql`
        SELECT full_address FROM addresses WHERE address_id = ${address_id}`;
    const fullAddress = rows[0].full_address;
    ({rows} = await client.sql`
        SELECT report_url, ts FROM uploads WHERE address_id = ${address_id}`);
        // TODO: get uploaded files too
    return {
        full_address: fullAddress,
        reports: rows
    };
}

export async function searchProperty(query) {
    const matchStr = `%${query.toUpperCase()}%`;
    console.log(`match string is ${matchStr}`);
    let {rows} = await sql`
        SELECT address_id, full_address
        FROM addresses
        WHERE full_address LIKE ${matchStr}`;
    console.log(rows);
    return rows;
}


export async function uploadBlob(file) {
    // console.log('pretending to upload blob');
    // return '1sgh43tneg9';
    const { url } = await put(file.name, file, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN
    });
    return url;
}

export async function addEntryToPostgres(formSubmission) {
    console.log('Adding entry to postgres');
    // return;
    let { address, city, state, zipcode, reports, email } = formSubmission;
    address = address.toUpperCase();
    city = city.toUpperCase();
    const fullAddress = `${address}, ${city}, ${state} ${zipcode}`;
    try {
        const client = await db.connect();
        // Check if the address already exists in the addresses table.
        let matchedAddress = await client.sql`
                SELECT address_id
                FROM addresses
                WHERE street_address = ${address}
                AND city = ${city}
                AND state = ${state}
                AND zipcode = ${zipcode}
                FOR UPDATE`; // Lock the row for update to prevent race conditions
        console.log(matchedAddress);
        let matchedAddressId;
        if (matchedAddress.rowCount > 0) {
            console.log(`found address in database: ${matchedAddress}`);
            matchedAddressId = matchedAddress[0].address_id;
        } else {
            console.log(`will insert address to database`);
            // If address_id is NULL, it means the address doesn't exist. Insert the new address.
            const {rows} = await client.sql`
                    INSERT INTO addresses (street_address, city, state, zipcode, full_address)
                    VALUES (${address}, ${city}, ${state}, ${zipcode}, ${fullAddress})
                    RETURNING address_id`;
            console.log(`inserted address to database:`);
            console.log(rows);
            matchedAddressId = rows[0].address_id;
        }

        // Now that we have the address_id, we can insert the upload record.
        await client.sql`
                INSERT INTO uploads (report_url, ts, email, address_id)
                VALUES (${reports[0]}, CURRENT_TIMESTAMP, ${email}, ${matchedAddressId})`;

    } catch (error) {
        console.error(error);
        return error;
    }
    return {success: true};
}