# JoiValidation

Questa libreria ha come obiettivo quello di validare i dati presi in input dalle richieste eseguite dal frontend.

Queste funzioni si basano sulla libreria pubblica joi.dev.

Ecco un esempio di utilizzo:

Questo è il file contente lo schema della validazione, e viene esportato ed eseguito nella rotta; in genere a questo file viene dato il nome {nome_rotta}.validation.js

```js
const Joi = require("joi");

const putFamily = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    nome: Joi.string().max(30).required(),
    nComponenti: Joi.number().integer().required(),
    utenteMongoDb: Joi.string().max(60),
    ipMongoDb: Joi.string().max(15),
    passwordMongoDb: Joi.string().max(60),
  }),
};

module.exports = { putFamily };
```

Quest'ultimo viene eseguito all'interno della {nome_rotta}.route.js, ecco un esempio di codice:

```js
const express = require("express");
const router = express.Router();

const expenseController = require("./expense.controller");
const expenseValidation = require("./expense.validation");
const validate = require("../../../middleware/JoiValidation");
const validateToken = require("../../../middleware/validateToken");

router.get(
  "/",
  validate(expenseValidation.getTotalExpense), //Questo è il metodo che valida l'input
  expenseController.getTotalExpense
);
```

Ovviamente esistono tre tipologie di input nelle API:

- params --> http://192.168.1.1:8080/api/pippo/3
- query --> http://192.168.1.1:8080/api/pippo/?nome_campo=4
- body --> {"nome": "Michele", "cognome": "Gabrieli"}

Qualora un dato non combaciasse con lo schema definito allora verrà segnalato l'errore e l'API non eseguirà il codice interno al controller.
