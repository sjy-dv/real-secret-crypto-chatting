const io = require("socket.io")();
const { connection } = require("./dynamo/dynamo");
const config = require("./dynamo/config");

const chat_socket = io.of("/chat");
const online_socket = io.of("/room");

const dynamo_form = (user_id, msg) => {
    let params = {
        TableName: config.aws_table_name,
        Item: {
            msg: [{ user_id, msg }],
        },
    };
    return params;
};

module.exports = {
    io,
    chat_socket,
    online_socket,
    init: async (app) => {
        await chat_socket.on("connection", async (socket) => {
            socket.on("chat_msg", async (chat_msg) => {
                try {
                    const get_data = await dynamo_form(
                        chat_msg.user_id,
                        chat_msg.msg
                    );
                    await connection.put(get_data);
                    await chat_socket.emit("chat_msg", chat_msg);
                } catch (error) {}
            });
        });
    },
};
