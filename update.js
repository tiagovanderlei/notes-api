import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-libs';

export const main = handler(async (event, context) => {

    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },

        UpdateExpression: "SET content = :content, attachment = :attachment, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ':content': data.content || null,
            ':attachment': data.attachment || null,
            ':updatedAt': Date.now()
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };

    await dynamoDb.update(params);

    return {status: true};
});