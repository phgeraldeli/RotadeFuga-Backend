const bcryptjs = require("bcryptjs");

const hashPassword = async data => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data, salt);

    return hashedPassword;
}

module.exports.hashPassword = hashPassword;
