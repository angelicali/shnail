import * as db from '$lib/server/database.js';
import fs from 'fs';
import path from 'path';

export const actions = {
    upload: async ({cookies, request}) => {
        const data = await request.formData();
        console.log(`form data:`, data);
        const reports = data.getAll('report');
        

        const files = Array.from(data.getAll('report'));
        console.log("reports:", reports);
        console.log("files:", files);

        const formSubmission = {
            address:data.get('address-street'),
            city: data.get('address-city'),
            state: data.get('address-state'),
            zipcode: data.get('address-zipcode'),
            reports: [],
            comment:data.get('comment')
        }
        if (files.length === 0) {
            db.addEntry(formSubmission); 
            console.log('no files uploaded');
            return;
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }

        const timestamp = Date.now();

        const fileWritePromises = [];

        files.forEach((file) => {
            if (file.type !== 'application/pdf') {
                throw new Error('Only PDF files are allowed');
            }

            const filename = `${timestamp}-${file.name}`;
            const filePath = path.join(uploadDir, filename);

            // Create a writable stream to save the file
            const writeStream = fs.createWriteStream(filePath);
            
            const fileWritePromise = new Promise((resolve,reject) => {
                writeStream.on('finish', () => {
                    console.log(`File saved: ${filePath}`);
                    resolve(filePath); // Resolve promise with file path
                    formSubmission.reports.push(filePath);
                });

                // Listen for 'error' event to handle any errors during file saving
                writeStream.on('error', (error) => {
                    console.error(`Error saving file: ${error}`);
                    reject(error); // Reject promise with error
                });
            });
             // Add the promise for this file write operation to the array
             fileWritePromises.push(fileWritePromise);

             file.arrayBuffer().then(buffer => {
                writeStream.write(Buffer.from(buffer));
                writeStream.end();
            });
        });

        try {
            await Promise.all(fileWritePromises);
            await db.addEntry(formSubmission);
            console.log('All files saved successfully');
        } catch (error) {
            console.error('Failed to save files or add entry to database:', error);
            throw new Error('Failed to save files or add entry to database');
        
        }
            
            


        

    }
}