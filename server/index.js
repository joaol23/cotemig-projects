import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const path = require('path');
const express = require("express");

import { checkFilesExists, getFiles } from './handleFiles/readFiles.js';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
})

app.get("/arquivos-estados", async (req, res) => {
  await checkFilesExists()
  let files = await getFiles();
  res.json({ files: files });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});