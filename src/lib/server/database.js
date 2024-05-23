import { properties } from '$lib/server/data.js';

const db = new Map();
const random_comments = ["great house!", "it's ok", "cast iron pipes", "foundation issues"];
properties.forEach(property => {
    db.set(property.id, {
        id: property.id,
        address: property.address,
        city: property.city,
        state: property.state,
        zipcode: property.zipcode,
        fullAddress: `${property.address}, ${property.city}, ${property.state} ${property.zipcode}`,
        uploads: [
            {
                report: [],
                comment: random_comments[Math.floor(Math.random() * random_comments.length)]
            }
        ]
    })
});

// TODO: enable concurrent ID creation. Maybe use crypto.randomUUID()
let nextId = 104;


export function getProperty(propertyId) {
    return db.get(propertyId);
}

export function getPropertyList() {
    return db;
}

export function findPropertyByAddress(address) {
    const addressLowerCase = address.toLowerCase();
    const properties = [...db.values()].filter((dbentry) => dbentry.address.toLowerCase().includes(addressLowerCase));
    return properties;
}

export function getOrAddPropertyIdByAddress({ address, city, state, zipcode }) {
    const fullAddress = `${address}, ${city}, ${state} ${zipcode}`;
    let property = [...db.values()].find(dbentry => dbentry.fullAddress === fullAddress);
    if (property) return property.id; 
    let propertyId = nextId;
    nextId += 1;
    db.set(propertyId, {
        id: propertyId,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        fullAddress: fullAddress,
        uploads: []
    })
    return propertyId;
}



export function addEntry(entry) {
    const propertyId = getOrAddPropertyIdByAddress(entry);
    const property = db.get(propertyId);
    property.uploads.push({report: entry.report, comment: entry.comment});
    db.set(propertyId, property);
    console.log("db adding success");
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