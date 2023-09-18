const { connect } = require("mongoose");
module.exports = async () => {
    try {
        await connect(process.env.DB_Path, { useNewUrlParser: true });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
