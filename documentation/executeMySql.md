# ExecuteMySql

Quest'ultima è una libreria privata con l'obiettivo di velocizzare la programmazione e scrittura di query.

La libreria va importata nel seguente modo:

```js
const connFunction = require("./utils/executeMySql");
```

connFunction è un oggetto contente 4 tipologie di funzioni:

- connFunction.query();
- connFunction.insert();
- connFunction.update();
- connFunction.delete();

Ovviamente questi metodi sono di tipo asincrono quindi è necessario inserire un await davanti.

Ecco degli esempi per ogni tipologia di funzione:

## connFunction.query(mysql_query_text, {arguments});

```js
const mysql = "select id, nome, spesa_fissa from categoria where id=@id";
const result = await connFunction.query(mysql, { id: 1 });
return result;
```

Quando scrivo nel testo della query un "@id" è un segnaposto che verrà poi sostituito dalla funzione dall'argomento dato in input come avente il nome id.

## connFunction.insert(nome_tabella, {arguments});

```js
const result = await connFunction.insert("categoria", {
  nome: "Attrice",
  spesa_fissa: true,
});
return result;
```

## connFunction.update(nome_tabella, {arguments_update}, where_condition_without_where, {arguments})

```js
const result = await connFunction.update(
  "categoria",
  {
    nome: "Attore",
    spesa_fissa: false,
  },
  "id=@id",
  {
    id: 2,
  }
);
return result;
```

## connFunction.delete(nome_tabella, where_condition_without_where, {arguments})

```js
const result = await connFunction.delete("categoria", "id=@id", { id: 2 });
return result;
```

# N.B.

E' suggerito per rendere le query richiamabili da più parti creare un model per ogni tabella del database.

Il model conterrà delle funzioni interne ad un oggetto che estrapolano i dati e ti fanno il return del risultato della query.

Qualora ci fossero delle join è suggeribile inserire la query all'interno del model più contestualizzato.

Ecco un esempio di model:

```js
const connFunction = require("../utils/executeMySql");

const Authorization = {
  selectAllAuthorization: async () => {
    const mysql = "select id, nome, descrizione from autorizzazione where 1=1";
    const result = await connFunction.query(mysql, {});
    return result;
  },
  selectAllAuthorizationUser: async ({ idu }) => {
    const mysql =
      "select a.id, a.nome, a.descrizione, IF(au.valore=1, TRUE, FALSE) as valore from autorizzazione a inner join autorizzazione_utente au on au.id_utente=@idu and au.id_autorizzazione=a.id where 1=1";
    const result = await connFunction.query(mysql, { idu });
    return result;
  },
  updateAuthorizationUser: async ({ idu, idAuthorization, valore }) => {
    const result = await connFunction.update(
      "autorizzazione_utente",
      { valore },
      "id_utente=@idu and id_autorizzazione=@idAuthorization",
      { idu, idAuthorization }
    );
    return result;
  },
  insertAuthorizationUser: async ({ id_utente, id_autorizzazione, valore }) => {
    const result = await connFunction.insert("autorizzazione_utente", {
      valore,
      id_utente,
      id_autorizzazione,
    });
    return result;
  },
  checkAuthorization: async ({ id_auth, idu }) => {
    const mysql = `
        SELECT au.id_autorizzazione, au.valore 
        FROM autorizzazione_utente au 
        WHERE au.id_autorizzazione IN (@id_auth) AND au.id_utente=@idu AND au.valore='1'`;

    const result = await connFunction.query(mysql, { id_auth, idu });
    return result;
  },
};

module.exports = Authorization;
```
