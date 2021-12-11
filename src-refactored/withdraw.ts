// ---Dependencies
import { WebSocket } from 'ws';
// ---Types
import {
  HandleDataParams,
  SocketUser,
  AcountStandingCBParams,
  IsDefaultUserEmailVerifiedCBParams,
  DbCallBackF
} from './configuration/customTypes';
// ---Configurations
import db from './database';
import config from './configuration/app-config';
const { minEarnedToWithdraw, validTypes, validCountryCodes } = config.withdraw;

const money = (minEarnedToWithdraw / 1000).toFixed(2);

const minEarnText = `You must earn at least ${minEarnedToWithdraw} coins ($${money}) through the offer walls before withdrawing.<br>This is to prevent abuse of the site bonuses. Please contact staff with any questions.`;

// -------------------------------- Aux Functions --------------------------------
function feedback(socket: WebSocket, feedback: string, feedbackType: string) {
  socket.emit('withdrawFeedback', feedback, feedbackType);
}

// -------------------------------- Main Functions --------------------------------
function onsiteGiftcardWithdraw(socket: WebSocket, socketuser: SocketUser) {
  // ---------------- VALIDATIONS ------------------
  function checkWithdrawType(type: string) {
    const notValidType = !validTypes.includes(type);
    if (notValidType) {
      const errorMessage = 'An error occurred. Please try refreshing.';
      return feedback(socket, errorMessage, type);
    }
  }
  function checkCountryCode(countryCode: string, type: string) {
    const notValidCountry = !validCountryCodes.includes(countryCode);
    if (notValidCountry) {
      const errorMessage = 'An error occurred. Please try refreshing.';
      return feedback(socket, errorMessage, type);
    }
  }
  function checkSocketUser(type: string) {
    if (!socketuser) {
      const errorMessage = 'Please login to withdraw!';
      return feedback(socket, errorMessage, type);
    }
  }
  function checkCoinAmount(coinAmount: number, type: string) {
    const notValidcoinAmount = isNaN(coinAmount) || !coinAmount;
    if (notValidcoinAmount) {
      const errorMessage = 'Please select an amount!';
      return feedback(socket, errorMessage, type);
    }
  }
  function checkError(err?: DbCallBackF['err']) {
    if (err) {
      const errorMessage = 'An error occurred, please try again';
      return feedback(socket, errorMessage, '');
    }
  }
  function checkAccountSuspension(standing: DbCallBackF['standing']) {
    const isSuspended = standing.banned || standing.frozen;
    if (isSuspended) {
      const errorMessage =
        'You are currently banned from withdrawing, please contact staff if you believe this is a mistake.';
      return feedback(socket, errorMessage, '');
    }
  }
  function checkVerifiedEmail(isEmailVerified: DbCallBackF['isEmailVerified']) {
    if (isEmailVerified) {
      const errorMessage =
        'You must verify your E-mail address before requesting a withdrawal!';
      return feedback(socket, errorMessage, '');
    }
  }
  function checkBalance(balance: DbCallBackF['balance'], coinAmount: number) {
    const notValidBalance = balance < coinAmount;
    if (notValidBalance) {
      const errorMessage = "You don't have enough balance!";
      return feedback(socket, errorMessage, '');
    }
  }
  function checkEarnings(earnedEnoughBool: DbCallBackF['earnedEnoughBool']) {
    if (!earnedEnoughBool) {
      const errorMessage = minEarnText;
      return feedback(socket, errorMessage, '');
    }
  }
  // ---------------- MAIN METHOD ------------------
  function handleData(data: HandleDataParams) {
    const feedbackType = data.type || '';
    const coinAmount = parseInt(data.coinAmount);
    const countryCode = data.countryCode || 'WW';
    // --- Validate data
    checkWithdrawType(feedbackType);
    checkCountryCode(countryCode, feedbackType);
    checkSocketUser(feedbackType);
    checkCoinAmount(coinAmount, feedbackType);

    db.getAccountStanding(
      socketuser.gainid,
      (err: AcountStandingCBParams['err'], standing: AcountStandingCBParams['standing']) => {
        checkError(err);
        checkAccountSuspension(standing);
        db.isDefaultUserEmailVerified(
          socketuser.gainid,
          (err: IsDefaultUserEmailVerifiedCBParams['err'], isEmailVerified: IsDefaultUserEmailVerifiedCBParams['isEmailVerified'])=>{
            checkError(err);
            checkVerifiedEmail(isEmailVerified);
          }
        )
      },
    );
  }
}

export default {
  onsiteGiftcardWithdraw,
};
