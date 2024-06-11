import { handleUpload } from "@vercel/blob/client";
import {error, json} from "@sveltejs/kit";
// import * as db from '$lib/server/database.js';

export async function POST({ request }) {
    const body = await request.json();
    console.log(`api/upload received POST request json:`, body);

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                console.log(`onBeforeGenerateToken for pathname: ${pathname}`)
                return {
                    allowedContentTypes: ['application/pdf'],
                }
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log('blob upload completed', blob, tokenPayload);
                // return new Response(blob.url, {
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // });
            }
        })
        console.log(`api/upload POST returning json:`, jsonResponse);
        return json(jsonResponse);
    } catch (err) {
        console.error(`api/upload POST throwing an error`, error);
        error(500, err);
        
    }
}