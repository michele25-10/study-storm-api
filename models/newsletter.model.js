const connFunction = require('../utils/executeMySql');

const TABLE = "newsletter";

const Newsletter = {
    insertNewsletter: async ({ email, cookie_accepted }) => {
        const result = await connFunction.insert(TABLE, {
            email,
            cookie_accepted,
        });
        return result;
    },
}

module.exports = Newsletter;