import fs from 'fs';
import { createFilterStateFiles } from './writeFiles.js';
import { pathApiFiles, pathFilterFiles } from '../database/api/config.js'

export async function checkFilesExists() {
    let files = await isDirEmpty('server/database/filter-state');
    if (files.length === 0) {
        createFilterStateFiles();
    }
}

export async function getFiles() {
    let filesNames = await isDirEmpty('server/database/filter-state');
    let states = JSON.parse(await fs.readFileSync(pathApiFiles + 'states.json'));

    let files = [];
    await filesNames.forEach(async fileName => {
        let siglaState = fileName.split("_")[0];
        let fileState = states.find(state => state.Sigla === siglaState);
        let countCitiesByState = JSON.parse(await fs.readFileSync(pathFilterFiles + fileName)).length;

        files.push({
            fileName: fileName,
            fileState: fileState,
            countCities: countCitiesByState,
            type: "json"
        })
    })
    return files;
}


function isDirEmpty(dirname) {
    return fs.promises.readdir(dirname).then(files => {
        return files;
    });
}