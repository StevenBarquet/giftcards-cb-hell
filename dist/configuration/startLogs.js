"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// --------------------------------------IMPORTS------------------------------------
// Dependencies
const config_1 = __importDefault(require("config"));
const debug = require('debug')('app:prod');
// -----------------------------------MODULE-------------------------------
function startLogs(enviroment) {
    debug('------------ Backend dunning as: ', enviroment, '------------\n\n');
    debug('App name: ', config_1.default.get('name'));
    debug('App mail: ', config_1.default.get('mail.user'), '\n');
}
exports.default = startLogs;
//# sourceMappingURL=startLogs.js.map