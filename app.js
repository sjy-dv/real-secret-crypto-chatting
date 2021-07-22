const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

const { connection } = require("./dynamo/dynamo");
const config = require("./dynamo/config");

(function () {
    let params = {
        TableName: config.aws_table_name,
        Item: {
            id: "test_id",
            idx: test_idx,
            user: "test_user",
            chat: ["test1", "test2"],
        },
    };
    connection.put(params, (err, data) => {
        if (err) {
            return console.log(err);
        } else {
            console.log("success~~!!!");
        }
    });
})();

const web_server = require("http").createServer(app).listen(8081);
const web_socket = require("./socket-server");

web_socket.io.attach(web_server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

web_socket.init();
