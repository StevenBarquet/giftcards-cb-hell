"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// --------------------------------------IMPORTS------------------------------------
// Dependencies
const express_1 = __importDefault(require("express"));
const debugProd = require('debug')('app:prod');
// Otros
const getCerts_1 = __importDefault(require("./configuration/getCerts"));
const startLogs_1 = __importDefault(require("./configuration/startLogs"));
// -----------------------------------CONFIG-------------------------------
const app = express_1.default();
const enviroment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;
startLogs_1.default(enviroment); // Just and example of posible use of configs
// -----------------------------------SSL-------------------------------
const http = require('http');
const https = require('https');
const trySSL = process.env.USE_SSL || false; // Set use of https from enviroment
const server = trySSL ? https : http;
const options = trySSL ? getCerts_1.default() : {}; // Get ssl certs if https true
// -----------------------------------SERVER-------------------------------
server
    .createServer(options, app)
    .listen(port, () => {
    debugProd('https ', trySSL, ` listening to port ${port}...`);
});
//# sourceMappingURL=index.js.map