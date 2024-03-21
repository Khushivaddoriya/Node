const { User } = require("../../schema/user.schema");
const casual  = require('casual')
const bcrypt = require("bcrypt");
const { ENUMS } = require("../../constant/enum.constants");
const saltRounds = process.env.SALT_ROUNDS;
require("dotenv").config()

const UserSeeder = async () => {

    const seedUser = async (count) => {
        const hasSeeded = await checkIfSeeded();
        if (!hasSeeded) {
            const users = [];
            for (let i = 0; i < count; i++) {
                const password = await funService.passwordHash(casual.password);
                users.push({
                    first_name: casual.first_name,
                    last_name: casual.last_name,
                    email: casual.email,
                    password: password,
                    phone_number: casual.phone.replace(/-/g, ''),
                    user_type: ENUMS.USER_TYPE.USER,
                });
            }
            await User.insertMany(users);
        }
    };

    const checkIfSeeded = async () => {
        const count = await User.countDocuments().exec();
        return count > 0;
    };

    const funService = {
        passwordHash: async (password) => {
            return new Promise((resolve, reject) => {
                bcrypt.hash(password, parseInt(saltRounds), (err, hash) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(hash);
                });
            });
        }
    };

    const numberOfUsersToSeed = 2;
    await seedUser(numberOfUsersToSeed);
};

module.exports = UserSeeder;
