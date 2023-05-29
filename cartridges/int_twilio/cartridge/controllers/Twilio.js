'use strict';

const server = require('server');
const twilioServiceHelpers = require('*/cartridge/scripts/helpers/twilioServiceHelpers');
const preferences = require('*/cartridge/scripts/helpers/preferences');
const CustomerMgr = require('dw/customer/CustomerMgr');

server.get('getCode', server.middleware.https, sendOTP);
server.get('verifyCode', server.middleware.https, verifyOTP);

function sendOTP(req, res, next) {
    let phoneNumber = '';

    if (!!req.querystring.email) {
        const customer = CustomerMgr.getCustomerByLogin(req.querystring.email);
        phoneNumber = customer.profile.phoneHome;
    } else {
        phoneNumber = req.querystring.phoneNumber;
    }

    var result = twilioServiceHelpers.callService({
        To: '+91' + phoneNumber,
        Channel: preferences.CHANNEL.SMS,
        serviceType: preferences.SERVICE_TYPE.CODE
    })

    if (!empty(result.object) && result.status === 'OK') {
        res.json({
            res: result.status,
            phoneNumber: phoneNumber
        });
    }

    return next();
};

function verifyOTP(req, res, next) {
    const code = req.querystring.code;
    const phoneNumber = req.querystring.phoneNumber;

    var result = twilioServiceHelpers.callService({
        To: '+91' + phoneNumber,
        Code: code,
        serviceType: preferences.SERVICE_TYPE.VERIFY_CODE
    });

    if (!empty(result.object) && result.status === 'OK' && result.object.status === 'approved' && result.object.valid === true) {
        res.json({
            res: result.status
        });
    }

    return next();
};

module.exports = server.exports();