const connFunction = require('../utils/executeMySql');

const TABLE = "palette_color";

const PaletteColor = {
    selectAllPalette: async () => {
        const mysql = `
        select id, primary_color, secondary_color
        from ${TABLE} 
        where 1=1; `;
        const result = await connFunction.query(mysql);
        return result;
    }
};

module.exports = PaletteColor;