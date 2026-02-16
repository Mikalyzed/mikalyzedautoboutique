import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  console.error("Missing AWS credentials. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (or MY_AWS_ACCESS_KEY_ID and MY_AWS_SECRET_ACCESS_KEY).");
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: accessKeyId && secretAccessKey
    ? { accessKeyId, secretAccessKey }
    : undefined,
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "mikalyzed-vehicles";
