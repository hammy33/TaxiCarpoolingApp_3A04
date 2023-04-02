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

    login: () => {},
};

export default DataService;
