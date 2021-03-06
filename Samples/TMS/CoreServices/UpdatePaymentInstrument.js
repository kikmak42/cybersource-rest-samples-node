'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var RetrievePaymentInstrument = require('./RetrievePaymentInstrument');

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsTokenIdPatch method will update the paymentInstrument
 */
function updatePaymentInstrument(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.PaymentInstrumentsApi(configObject);

        var card = new CybersourceRestApi.Tmsv1paymentinstrumentsCard();
        card.expirationMonth = "08";
        card.expirationYear = "2022";
        card.type = "visa";

        var billTo = new CybersourceRestApi.Tmsv1paymentinstrumentsBillTo();
        billTo.firstName = "John";
        billTo.lastName = "Deo";
        billTo.company = "CyberSource";
        billTo.address1 = "12 Main Street";
        billTo.address2 = "20 My Street";
        billTo.locality = "Foster City";
        billTo.administrativeArea = "CA";
        billTo.postalCode = "90200";
        billTo.country = "US";
        billTo.email = "john.smith@example.com";
        billTo.phoneNumber = "555123456";

        var instrumentIdentifierCard = new CybersourceRestApi.Tmsv1instrumentidentifiersCard();
        instrumentIdentifierCard.number = "4111111111111111";
        var instrumentIdentifier = new CybersourceRestApi.Tmsv1paymentinstrumentsInstrumentIdentifier();
        instrumentIdentifier.card = instrumentIdentifierCard;

        var request = new CybersourceRestApi.Body3();
        request.card = card;
        request.billTo = billTo;
        request.instrumentIdentifier = instrumentIdentifier;

        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";

        RetrievePaymentInstrument.retrivePaymentIdentifiers(function (error, data) {
            if (data) {
                var tokenId = data['id'];
                console.log("\n*************** Update PaymentInstrument  ********************* ");
                console.log("\nToken ID passing to paymentinstrumentsTokenIdPatch : " + tokenId);

                instance.tmsV1PaymentinstrumentsTokenIdPatch(profileId, tokenId, request, function (error, data, response) {
                    if (error) {
                        console.log("\nError in Update PaymentInstrument : " + error);
                    }
                    else if (data) {
                        console.log("\nData of Update PaymentInstrument : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  Update PaymentInstrument : " + JSON.stringify(response));
                    console.log("\nResponse Code of Update PaymentInstrument :" + JSON.stringify(response['status']));
                    callback(error, data);
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    updatePaymentInstrument(function () {
        console.log('Update PaymentInstrument end');
    });
}
module.exports.updatePaymentInstrument = updatePaymentInstrument;