import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const path = require('path');
const express = require("express");

import { checkFilesExists, getFiles, getPathFileById, readFile } from './handleFiles/readFiles.js';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.resolve(__dirname, '../page/build')));

app.get("/arquivos-estados", async (req, res) => {
  await checkFilesExists()
  let files = await getFiles();
  res.json({ files: files });
})

app.get("/arquivo-detalhes/:id", async (req, res) => {
  const idFile = req.params.id;
  const path = await getPathFileById(idFile);
  const contentFile = await readFile(path);
  res.json({ contentFile: contentFile });
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});