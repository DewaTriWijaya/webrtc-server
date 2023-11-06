const videoCall = require("./videoCall");

const Status = require("../services/mysql").Status;

module.exports = (io) => {
	io.on("connection", (socket) => {
		console.log(" socket connected");
		socket.on("user", (email) => {
			console.log("connected user:", email);
			socket.email = email;
			Status.update(
				{
					aktif: 1,
				},
				{
					where: {
						email_pengguna: email,
					},
				}
			);
		});
		videoCall(io);
		socket.on("disconnect", () => {
			console.log("disconnected user:", socket.email);
			// Status.update(
			// 	{
			// 		aktif: 0,
			// 	},
			// 	{
			// 		where: {
			// 			email_pengguna: socket.email,
			// 		},
			// 	}
			// );
		});
	});
};
