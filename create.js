import * as uui from 'uuid';
import AWS from 'aws-sdk';
import handler from './libs/handler-lib';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uui.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});
