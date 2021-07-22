const aws = require("aws-sdk");
const config = require("./config");

aws.config.update(config.aws_remote_config);

const connection = new aws.DynamoDB.DocumentClient();

module.exports = { connection };
