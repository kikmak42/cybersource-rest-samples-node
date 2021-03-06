'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var ProcessPayment = require('./ProcessPayment');

/**
 * This is a sample code to call VoidApi,
 * Void a Payment
 * Include the payment ID in the POST request to cancel the payment.
 */
function voidPayment(callback) {

    try {

        var configObject = new Configuration();
        var instance = new CybersourceRestApi.VoidApi(configObject);

        var clientReferenceInformation = new CybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "test_payment_void";

        var request = new CybersourceRestApi.VoidPaymentRequest();
        request.clientReferenceInformation = clientReferenceInformation;

        var enableCapture = true;

        ProcessPayment.processPayment(function (error, data) {
            if (data) {
                var id = data['id'];
                console.log("\n*************** Void Payment ********************* ");
                console.log("Payment ID passing to voidPayment : " + id);

                instance.voidPayment(request, id, function (error, data, response) {
                    if (error) {
                        console.log("\nError in void payment: " + error);
                    }
                    else if (data) {
                        console.log("\nData of void Payment : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  void Payment  : " + JSON.stringify(response));
                    console.log("\nResponse Code of void Payment : " + JSON.stringify(response['status']));
                    callback(error, data);
                });

            }
        }, enableCapture);

    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    voidPayment(function () {
        console.log('Void Payment end.');
    });
}
module.exports.voidPayment = voidPayment;