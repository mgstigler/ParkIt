'use strict';
import * as AWS from "aws-sdk";
import * as querystring from "querystring";
import { SpaceModel } from "../Shared/Models/spaceModel"


module.exports.GetSpace = (event, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));
    let docClient = new AWS.DynamoDB.DocumentClient()
    let table = "Guests";

    console.info(event);
    let response = {
        statusCode: 200,
        message: ""
    };

    let params = {
        TableName: table,
        Key:{
            "AlexaId": event.AlexaId
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            response.statusCode = 500;
            response.message = "Unable to find Space for address in " + event.City + ", " + event.State;
            callback(null, response);
        } else if (data.Item == null) {
            response.statusCode = 404;
            response.message = "Unable to find Space for address in " + event.City + ", " + event.State;
            callback(null, response);
        }else{
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            response.message = "Available spaces include " + JSON.stringify(data);
            callback(null, response);
        }
    });
};