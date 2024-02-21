# ErrorHandler

ErrorHandler è un middleware che viene eseguito quando all'interno di un altro middleware oppure controller viene segnalato un errore.

In base allo status che viene inserito lui ti fornisce un output preconfigurato e sicuro.

La funzione AsyncHandler di express-async-handler ci consente di evitare di costruire query con il try catch perchè quando capta un errore passa al nostro errorHandler.

Ecco un esempio di errore:

```js
//@desc Modifica famiglia
//@route PUT /api/user/
//@access private
const putFamily = asyncHandler(async (req, res) => {
  if (req.user.dev) {
    const result = await Category.updateCategory(
      {
        nome: "Pippo",
        spesa_fissa: false,
      },
      { id: req.params.id }
    );

    if (result.affectedRows != 1) {
      //Qui segnalo il mio errore; quest'ultimo verrà processato da errorHandler
      res.status(500);
      throw new Error();
    }

    res.status(201).send({ message: "Famiglia modificata con successo" });
  } else {
    //Qui segnalo il mio errore; quest'ultimo verrà processato da errorHandler

    res.status(401);
    throw new Error();
  }
});
```

In base allo status che inserisco mi darà una risposta di errore differente anche la mia API.
