import { createRequire } from 'module'
import { pathMenu, pathMemesCaption } from './database/api/config.js'
const require = createRequire(import.meta.url);

const path = require('path');
const express = require("express");

import { checkFilesExists, getFiles, getPathFileById, readFile } from './handleFiles/readFiles.js';
import * as url from 'url';
import { insertItemFile } from './handleFiles/writeFiles.js';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import ReactDOM from 'react-dom/server';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.resolve(__dirname, '../page/build')));

app.get("/arquivos-estados", async (req, res) => {
  await checkFilesExists()
  let files = await getFiles();
  res.json({ files: files });
})

app.get("/menu", async (req, res) => {
  let routes = await readFile(pathMenu);
  res.json({ links: routes });
})

app.get("/caption-meme/:id", async (req, res) => {
  const idMeme = req.params.id;
  const contentFile = await readFile(pathMemesCaption);
  const captionsMeme = getWithId(contentFile, idMeme, 'idImage');
  res.json({ captions: captionsMeme });
})

app.get("/arquivo-detalhes/:id", async (req, res) => {
  const idFile = req.params.id;
  const path = await getPathFileById(idFile);
  const contentFile = await readFile(path);
  res.json({ contentFile: contentFile });
})

app.get("/states", async (req, res) => {

  const html = `
      <html>
          <head>
              <title>Quiz Wall</title>
          </head>
          <body>
              <div id="react-view">teste</div>
          </body>
      </html>
  `;
  res.end(html)
})

app.use(express.json());

app.post("/insert-item", async (req, res) => {
  const data = req.body.data;
  const file = req.body.fileName;

  if (!file) {
    res.status(400).json({
      message: 'Campo fileName necessário'
    });
    return;
  }

  await insertItemFile(data, file)
  res.status(201).json({
    message: 'Adicionado com sucesso!'
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

function getWithId(data, id, index) {
  return data.filter(each => each[index] == id);
}