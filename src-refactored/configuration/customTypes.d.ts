export default null;

export interface HandleDataParams {
  type?: string;
  coinAmount: string;
  countryCode: string;
}

export interface SocketUser {
  gainid: string;
}

// ------- Database Types
export interface AcountStandingCBParams {
  err?: string;
  standing: {
    banned: boolean;
    frozen: boolean;
  }
}
export type AcountStandingCB = (err: AcountStandingCBParams['err'], standing: AcountStandingCBParams['standing']) => any;

export interface IsDefaultUserEmailVerifiedCBParams {
  err?: string;
  isEmailVerified: boolean;
}
export type IsDefaultUserEmailVerifiedCB = (err: IsDefaultUserEmailVerifiedCBParams['err'], isEmailVerified: IsDefaultUserEmailVerifiedCBParams['isEmailVerified']) => any;

export interface DbCallBackF {
  err?: string;
  isEmailVerified: boolean;
  balance: number;
  earnedEnoughBool: boolean;
  standing: {
    banned: boolean;
    frozen: boolean;
  }
}