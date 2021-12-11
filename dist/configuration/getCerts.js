"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
// --------------------------------------IMPORTS------------------------------------
// ---Dependencies
const fs_1 = __importDefault(require("fs"));
const sslPath = process.env.SSL_PATH || null;
// -------------------------------------MAIN METHOD---------------------------------
function getCerts() {
    let certs = {};
    try {
        if (sslPath) {
            certs = {
                cert: fs_1.default.readFileSync(`${sslPath}/fullchain.pem`),
                key: fs_1.default.readFileSync(`${sslPath}/privkey.pem`)
            };
        }
        else {
            certs = {
                cert: fs_1.default.readFileSync('./self-signed-certs/certificate.crt'),
                key: fs_1.default.readFileSync('./self-signed-certs/certificate.key')
            };
        }
        console.log('exito cert: ', certs);
    }
    catch (error) {
        certs = {};
        console.log('fallo cert: ', error);
    }
    return certs;
}
exports.default = getCerts;
//# sourceMappingURL=getCerts.js.map