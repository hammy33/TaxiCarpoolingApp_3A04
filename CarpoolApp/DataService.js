import * as CryptoJS from "crypto-js";

const config = {
    api: "https://antonkanug.pythonanywhere.com",
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
};

const encrypt = (jsonData) => {
    const key = CryptoJS.enc.Utf8.parse("AAAAAAAAAAAAAAAA"); //key used in Python
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(jsonData), key, {
        mode: CryptoJS.mode.ECB,
    });
    return encrypted.toString();
};

const decrypt = (message) => {
    const key = CryptoJS.enc.Utf8.parse("AAAAAAAAAAAAAAAA"); //key used in Python
    const decrypted = CryptoJS.AES.decrypt(message, key, {
        mode: CryptoJS.mode.ECB,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

const DataService = {
    // ACCOUNTS
    register: (account) => {
        return fetch(`${config.api}/register`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt(account),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    login: (email, password) => {
        return fetch(`${config.api}/login`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt({ email, password }),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    updateAcc: (account) => {
        return fetch(`${config.api}/account/update`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt(account),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    deleteAcc: (email) => {
        return fetch(`${config.api}/account/update`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt({ email }),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    // Get active carpool offers, used to display to the carpool requester whats available
    // Takes the start and end of the requested trip -> retuns offers
    getOffersForRequester: (
        startCordLong,
        startCordLat,
        endCordLong,
        endCordLat
    ) => {
        return fetch(`${config.api}/getoffers`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt({
                    startCord: { long: startCordLong, lat: startCordLat },
                    endCord: { long: endCordLong, lat: endCordLat },
                }),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    // Add an offer after a scan of QR code
    addOffer: (
        offererEmail,
        startCordLong,
        startCordLat,
        endCordLong,
        endCordLat
    ) => {
        return fetch(`${config.api}/offer`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt({
                    offerer: offererEmail,
                    startCord: { long: startCordLong, lat: startCordLat },
                    endCord: { long: endCordLong, lat: endCordLat },
                }),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    // Gets requests made to active offers for an offerer
    // Display to offerer, interest made by requesters in their offer
    getRequestsForOfferer: (offererEmail) => {
        return fetch(`${config.api}/getrequests`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt({
                    offerer: offererEmail,
                }),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
    // Gets requests made to active offers for an offerer
    // Display to offerer, interest made by requesters in their offer
    addRequest: (offererEmail, requesterEmail) => {
        return fetch(`${config.api}/request`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                data: encrypt({
                    offerer: offererEmail,
                    requester: requesterEmail,
                }),
            }),
        })
            .then((response) => response.json())
            .then((response) => decrypt(response.data));
    },
};

export default DataService;
