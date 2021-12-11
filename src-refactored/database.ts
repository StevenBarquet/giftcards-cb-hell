// ---Dependencies
// import mysql from 'mysql';
// import assert from 'better-assert';
// import Promise from 'bluebird';
// ---Configurations
// import config from './configuration/app-config';
// ---Types
import { 
  AcountStandingCB,
  IsDefaultUserEmailVerifiedCB
} from './configuration/customTypes';

export default {
  getAccountStanding: (gainID: string, cb: AcountStandingCB )=>{
    console.log('Do something', gainID, cb);
  },
  isDefaultUserEmailVerified: (gainID: string, cb: IsDefaultUserEmailVerifiedCB )=>{
    console.log('Do something', gainID, cb);
  },
}