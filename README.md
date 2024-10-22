# genkit-middleware-sample

Setup

```bash
$ npm install
$ npm run build
```

Start the server

```bash
$ genkit start -o
```

Access the server

```bash
curl -X POST -H "Content-Type: application/json" -d '{"data": "[web url]"}' http://127.0.0.1:3400/summarizeFlow
{"result":"[image url]"}
```
