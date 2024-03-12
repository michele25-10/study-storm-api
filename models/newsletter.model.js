const connFunction = require('../utils/executeMySql');

const TABLE = "newsletter";

const Newsletter = {
    insertNewsletter: async ({ email, cookie_accepted }) => {
        const result = await connFunction.insert(TABLE, {
            email,
            cookie_accepted: cookie_accepted ? 1 : 0,
        });
        return result;
    },
}

module.exports = Newsletter;