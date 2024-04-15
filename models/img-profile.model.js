const connFunction = require('../utils/executeMySql');

const TABLE = "img_profile";

const ImgProfile = {
    selectImgProfile: async () => {
        const mysql = `
        select id, path, desc
        from ${TABLE} 
        where 1=1; `;
        const result = await connFunction.query(mysql);
        return result;
    }
};

module.exports = ImgProfile;