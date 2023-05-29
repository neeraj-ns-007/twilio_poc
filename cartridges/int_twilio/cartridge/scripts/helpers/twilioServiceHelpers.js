'use strict';

var Bytes = require('dw/util/Bytes');
var Encoding = require('dw/crypto/Encoding');
var Logger = require('dw/system/Logger').getLogger('TwilioServiceHelper');
var preferences = require('*/cartridge/scripts/helpers/preferences');
var twilioService = require('*/cartridge/scripts/services/twilioOTPService');

function getBase64String(client_id, secret) {

    try {
        var byteStr = new Bytes(client_id + ':' + secret, 'UTF-8');
        var base64Str = Encoding.toBase64(byteStr);
        return base64Str;
    } catch (error) {
        Logger.error('Error in string conversion to base64 :: ' + error.msg);
    }
}

function callService(payload) {

    var result;
    result = twilioService.twilioService.call(payload);

    return result;
}

module.exports = {
    getBase64String: getBase64String,
    callService: callService
}