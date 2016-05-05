
# watson-bot-test

This is just a bot to test the Watson Dialog API. This app simulates a _bank-oriented_ spanish [IVR](https://en.wikipedia.org/wiki/Interactive_voice_response). You can ask the bot about your bank accounts or credit cards; don't panic, all the conversation is _fake-data_ driven (© myself).

[![Dependency Status](https://david-dm.org/vermicida/watson-bot-test.svg)](https://david-dm.org/vermicida/watson-bot-test)

## Getting started

The first step is to create an [IBM Bluemix](https://console.ng.bluemix.net/) account and a new service for [Dialog](https://console.ng.bluemix.net/catalog/services/dialog/); you can find it under the Catalog's Watson section. You will be using the Dialog service's username and password in a minute, so have them on hand; get them from your IBM Bluemix app's environment variables.

Now, clone this repo using the command below:
```bash
$ git clone https://github.com/vermicida/watson-bot-test.git
```

Then, install de app dependencies using NPM:
```bash
$ npm install
```

Now we're ready to configure the app. 

## Configuration

Open the `config.json` file, located in the app root, and fill in the Dialog credentials: 
```json
{
  "watson": {
    "dialog": {
      "username": "Write down the username you already got right here",
      "password": "And do the same with the password here"
    }
  }
}
```

It's time to upload the IVR dialog to your service. Go to the `dialog` directory and run this command:
```bash
$ node dialog-create.js ivr-es-dialog.xml MyDialog
```

This script will use your credentials to create a new dialog. This dialog is just a question/answer flow based on the WatsonDialogDocument_1.0 schema. Feel free to add or remove conversation blocks from the XML dialog to improve the experience.

The dialog creation outputs a **dialog_id**; don't forget to push it to the `config.json` file:
```json
{
  "watson": {
    "dialog": {
      "dialogId": "Insert your dialog identifier here, please"
    }
  }
}
```

You can set the server's host and port if you want. Do it this way:
```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 9000
  }
}
```

## Running

You're only one step to chat with your bot. Just run the NPM `start` script in the root directory:
```bash
$ npm start
```

Navigate the server in a browser _et voilà_!

The conversation must flow this way.
- **Bot**: ¡Hola! Soy tu agente virtual. ¿Necesitas información?
- **You**: Sip, claruuu
- **Bot**: ¿Sobre qué necesitas información? Te puedo dar información de tus cuentas o tarjetas. Si lo prefieres, puede pasarte con un agente.
- **You**: Quiero info de mis cuentas, por fa
- **Bot**: Cuentas, perfecto. ¿Qué necesitas? Puedo informarte de tu saldo o de tus últimos movimientos.
- **You**: Dime mi saldo, pero no me asustes
- **Bot**: Pues tengo malas noticias. Estás en números rojos con -56,11 €. Voy a tener que hablar con tu madre para que te suba la paga.

## License

Code released under the [MIT license](./LICENSE).
