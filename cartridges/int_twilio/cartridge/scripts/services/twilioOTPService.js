'use strict';

var Logger = require('dw/system/Logger').getLogger('Twilio-Code');
var StringUtils = require("dw/util/StringUtils");
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var preferences = require('*/cartridge/scripts/helpers/preferences');
var Site = require('dw/system/Site');

var twilioService = LocalServiceRegistry.createService('int_twilio.rest.api.v2.services', {
    createRequest: function (svc, payload) {
        var twilioServiceHelpers = require('*/cartridge/scripts/helpers/twilioServiceHelpers');
        var verifySID = Site.getCurrent().getCustomPreferenceValue('twilioVerifyServiceSID');

        try {
            var creds = svc.getConfiguration().credential;
            let reqBody = '';
            svc.setRequestMethod("POST");

            if (payload.serviceType === preferences.SERVICE_TYPE.CODE) {
                svc.setURL(svc.getURL() + verifySID + '/Verifications');
                reqBody = {
                    To: payload.To,
                    Channel: payload.Channel
                }
            } else if (payload.serviceType === preferences.SERVICE_TYPE.VERIFY_CODE) {
                svc.setURL(svc.getURL() + verifySID + '/VerificationCheck');
                reqBody = {
                    To: payload.To,
                    Code: payload.Code
                }
            }

            svc.addHeader('Authorization', 'Basic ' + twilioServiceHelpers.getBase64String(creds.user, creds.password));
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');

            var bodyArgs = [], body = '';
            for (var data in payload) {
                bodyArgs.push(
                    StringUtils.format(
                        "{0}={1}",
                        encodeURIComponent(data),
                        encodeURIComponent(payload[data])
                ));
            }

            body = bodyArgs.join('&');
            return body;
        } catch (error) {
            Logger.error('Error in twilio service :: ' + error.message);
        }
    },
    parseResponse: function (svc, httpClient) {
        var result;
        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            Logger.error(httpClient.text + e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        }
        return result;
    },
    filterLogMessage: function (msg) {
        return msg;
    }
});

module.exports = {
    twilioService: twilioService
};