require("dotenv").config();
const { accessKeyId, secretAccessKey } = process.env;

module.exports = {
    aws_table_name: "test",
    aws_local_config: {
        region: "local",
        endpoint: "http://localhost:8081",
    },
    aws_remote_config: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: "ap-northeast-2",
    },
};
