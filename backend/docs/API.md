# API
Main api endpoint: `/api`

Struttura completa metodi:
```
/api
  |
  |-/menu [GET]
  |   |-/{id}
  |       |-/order [POST, auth]
```

## /menu
+ Tipo: `GET`
+ Richiede autenticazione: `no`
+ Esempio di risposta
```json
{
  "menu": [
    {
      "id": 1,
      "name": "Panino alla salamella",
      "type": "Panino",
      "qtyAvaible": 91,
      "description": "Non sai cos'é il panino alla salamella?!?!?"
    }
  ]
}
```

### /menu/{id}/order
+ Tipo: `POST`
+ Richiede autenticazione: `si`
+ Esempio di risposta
```json
{
    "orderId": 7,
    "food": {
        "id": 1,
        "name": "Panino alla salamella",
        "type": "Panino",
        "qtyAvaible": 90,
        "description": "Non sai cos'é il panino alla salamella?!?!?"
    }
}
```