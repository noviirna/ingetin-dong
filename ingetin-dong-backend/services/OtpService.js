const { log } = require("../helpers/logger");
const generatorUtil = require("../util/generatorUtil");
const hashingUtil = require("../util/hashingUtil");

class OtpService {
  static generateOtp(otpRequest) {
    log.info("otpRequest=", otpRequest, traceId);

    let { userId, traceId } = otpRequest;

    let otpId = generatorUtil.uuidv4();
    let otp = generatorUtil.otp();
    let otpHash = hashingUtil.hashObject(otp);
    let otpTimestamp = new Date().getTime();

    let otpResponse = {
      otpId,
      otpHash,
      otpTimestamp,
    };

    log.debug(
      "userId="
        .concat(userId)
        .concat(" otpId=")
        .concat(otpId)
        .concat(" otp=")
        .concat(otp)
        .concat(" otpHash=")
        .concat(hashedOtp),
      traceId
    );

    log.info("otpResponse=", otpResponse, traceId);
    return otpResponse;
  }
}

module.exports = OtpService;
