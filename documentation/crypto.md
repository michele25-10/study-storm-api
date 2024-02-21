# Crypto

Crypto non è nientaltro che un file js che espone delle funzioni per crittografare oppure hashare.

Le funzioni sono le seguenti:

- hash(stringa); --> Ti restituisce una stringa univoca.
- encrypt() --> ti restituisce un oggetto con l'iv e il testo crittografato per decrittografarlo devi essere in possesso della chiave segreta.
- decrypt() --> ti restituisce la stringa in formato comprensibile.

Alcuni veloci esempi:

```js
const { hash, encrypt, decrypt } = require("../../utils/crypto");

const hashedPassword = hash(password);

const credentialsString = JSON.stringify({ famiglia, email, password });
const hashCredentials = encrypt(credentialsString, process.env.SECRET_KEY);

//gli ultimi 32 caratteri corrisponderanno all'iv
const textCrypt = hashCredentials.encryptedText + hashCredentials.iv;

const textDecrypt = decrypt(hashCredentials, process.env.SECRET_KEY);
```
