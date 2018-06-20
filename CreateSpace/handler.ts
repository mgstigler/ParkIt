'use strict';
import * as AWS from "aws-sdk";
import { SpaceModel } from "../Shared/Models/spaceModel"


module.exports.CreateSpace = (event: SpaceModel, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));

    let docClient = new AWS.DynamoDB.DocumentClient();

    let table = "ParkingSpaces";

    let params = {
        TableName:table,
        Item:{
            "Address": event.Address,
            "City": event.City,
            "State": event.State,
            "ZipCode": event.ZipCode,
            "Rating": event.Rating,
            "OwnerId": event.OwnerId,
            "SpaceId": event.SpaceId,
            "Reserved": event.Reserved
        }
    };

    let response = {
        statusCode: 200,
        message: ""
    };


    console.log("Adding a new item...");
    docClient.put(params, (err, data) => {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to create Room. Error JSON:", JSON.stringify(err, null, 2));
            response.message = "Unable to create Space for address" + event.Address + " in " + event.City + ", " + event.State;
            callback(null, response);
        } else if(params == null){
            response.statusCode = 404;
            response.message = "Unable to create Space for address" + event.Address + " in " + event.City + ", " + event.State;;
            callback(null, response);
        } else {
            response.message = "Space for address" + event.Address + " in " + event.City + ", " + event.State + " has been created successfully!";
            callback(null, response);
        }
    });
};