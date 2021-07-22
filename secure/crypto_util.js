const crypto = require("crypto");
const Cryptr = require("cryptr");
require("dotenv").config();
const cryptr = new Cryptr(process.env.ac_cert);

User_SALTING_HASHING = (msg, userkey) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        "aes-256-ccm",
        Buffer.from(userkey),
        iv
    );
    const encrypt = cipher.update(msg);

    return (
        iv.toString("hex") +
        ":" +
        Buffer.concat([encrypt, cipher.final()]).toString("hex")
    );
};

User_SALTING_UNHASHING = (msg, userkey) => {
    const split_parts = msg.split(":");
    const iv = Buffer.from(split_parts.shift(), "hex");
    const encrypting_msg = Buffer.from(split_parts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
        "aes-256-ccm",
        Buffer.from(userkey),
        iv
    );
    const decrypt = decipher.update(encrypting_msg);

    return Buffer.concat([decrypt, decipher.final()]).toString();
};

Site_SALTING_HASHING = (msg) => {
    return cryptr.encrypt(msg);
};

Site_SALTING_UNHASHING = (msg) => {
    return cryptr.decrypt(msg);
};

module.exports = {
    SecretMSG: (msg, userkey) => {
        const user_filter = User_SALTING_HASHING(msg, userkey);
        const site_filter = Site_SALTING_HASHING(user_filter);
        return site_filter;
    },
    DeSecretMSG: (msg, userkey) => {
        const site_filter = Site_SALTING_UNHASHING(msg);
        const user_filter = User_SALTING_UNHASHING(site_filter, userkey);
        return user_filter;
    },
};
