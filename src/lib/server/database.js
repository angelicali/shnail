import {properties} from '$lib/server/data.js'

const db = new Map();
properties.forEach(property => {db.set(property.id, {
    id: property.id,
    address: property.address,
    comments: [property.comment]
})});

// TODO: enable concurrent ID creation. Maybe use crypto.randomUUID()
let nextId = 104;


export function getProperty(propertyId) {
    return db.get(propertyId);
}

export function getPropertyList() {
    return db;
}

export function addComment(entry) {
    let property = [...db.values()].find(dbentry => dbentry.address === entry.address);
    let propertyId;
    if (!property) {
        propertyId = nextId;
        nextId += 1;
        db.set(propertyId, {
            id: propertyId,
            address: entry.address,
            comments: []
        })
        property = db.get(propertyId);
    } else {
        propertyId = property.id;
    }

    property.comments.push(entry.comment);
    console.log(`added new entry ${entry}\n updated db: ${db}`);
}