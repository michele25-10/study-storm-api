const moment = require("moment");

const giorniSettimana = [
    "D",
    "L",
    "M",
    "M",
    "G",
    "V",
    "S",
];

const convertDaySql = (data) => {
    let result = [];
    for (let i = 0; i < 7; i++) {
        const obj = {
            position: i,
            name: giorniSettimana[i],
            tot: 0,
        }
        result.push(obj);
    }

    for (const row of data) {
        for (const giorno of result) {
            if (moment(row.date).format('d') == giorno.position) {
                giorno.tot = row.tot;
                break;
            }
        }
    }

    for (const giorno of result) {
        delete giorno.position;
    }

    return result;
}

const mesiAnno = [
    "",
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic"
];

const convertMonthSql = (data) => {
    let result = [];
    for (let i = 1; i < 13; i++) {
        const obj = {
            position: i,
            name: mesiAnno[i],
            tot: 0,
        }
        result.push(obj);
    }

    for (const row of data) {
        for (const mese of result) {
            if (moment(row.data).format("M") == mese.position) {
                mese.tot = row.tot;
                break;
            }
        }
    }

    for (const mese of result) {
        delete mese.position;
    }

    return result;
};

module.exports = { convertMonthSql, convertDaySql }; 