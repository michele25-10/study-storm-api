const asyncHandler = require('express-async-handler');
const Question = require('../../models/question.model');

//@desc API inserimento question utente
//@route POST /api/question/
//@access private
const addQuestion = asyncHandler(async (req, res) => {
    const result = await Question.insertQuestion({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Domanda inserita con successo!" });
});

//@desc API per eliminare le question
//@route DELETE /api/question/:id
//@access private
const deleteQuestion = asyncHandler(async (req, res) => {
    const result = await Question.deleteQuestion({ id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Domanda eliminata" });
});

//@desc API per modificare le question
//@route PUT /api/question/:id
//@access private
const putQuestion = asyncHandler(async (req, res) => {
    const result = await Question.updateQuestion({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Domanda modificata" });
});

//@desc API per ottenere una singola question
//@route GET /api/question/:id
//@access private
const getSingleQuestion = asyncHandler(async (req, res) => {
    const response = await Question.selectSingleQuestion({ id: req.params.id });
    res.status(200).send(response[0]);
});


const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

function generateRandomSyllable() {
    const length = Math.floor(Math.random() * 2) + 1; // lunghezza casuale della sillaba (1 o 2)
    let syllable = '';
    for (let i = 0; i < length; i++) {
        if (i === 0) {
            syllable += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
            syllable += vowels[Math.floor(Math.random() * vowels.length)];
        }
    }
    return syllable;
}

function generateRandomWord(length) {
    let word = '';
    for (let i = 0; i < length; i++) {
        word += generateRandomSyllable();
    }
    return word;
}

//@desc API per inserire dati di test per debug ed analisi algoritmo
//@route POST /api/question/test
//@access private
const postTest = asyncHandler(async (req, res) => {

    const id = ['a9985ac8-d187-11', 'a9986e10-d187-11'];
    for (const row of id) {
        for (let i = 0; i < 100; i++) {
            let desc = "";
            let title = "";

            for (let i = 0; i < 8; i++) {
                desc += generateRandomWord(12) + " ";
            }

            for (let i = 0; i < 4; i++) {
                title += generateRandomWord(7) + " ";
            }

            const result = await Question.insertQuestion({ desc, title, idu: row });
            if (result.affectedRows != 1) {
                res.status(500);
                throw new Error();
            }
        }
    }

    res.status(200).send("OK");
});

//@desc API per prendere le question più adeguate per l'utente
//@route GET /api/question/test
//@access private
const getFeedQuestion = asyncHandler(async (req, res) => {

    const search = req.query.search ? "%" + req.query.search + "%" : false;

    const response = await Question.selectFeed({ min: req.query.min, max: req.query.max, search })

    res.status(200).send(response);
});

module.exports = { addQuestion, deleteQuestion, putQuestion, getSingleQuestion, postTest, getFeedQuestion };