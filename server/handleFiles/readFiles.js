import fs from 'fs';
import { createFilterStateFiles } from './writeFiles.js';
import { pathApiFiles, pathFilterFiles } from '../database/api/config.js'

const PATH_STATE_FILES = 'server/database/filter-state';

export async function checkFilesExists() {
    let files = await getAllFilesFromDir(PATH_STATE_FILES);
    if (files.length === 0) {
        createFilterStateFiles();
    }
}

export async function readFile(path) {
    let contentFile = JSON.parse(await fs.readFileSync(path));
    return contentFile;
}

export async function getFiles() {
    let filesNames = await getAllFilesFromDir(PATH_STATE_FILES);
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
            type: "json",
            order: "DESC"
        })
    })
    files.sort(compareOrder);
    return files;
}

function compareOrder(a, b) {
    let comparison = 0, switchOrder;

    a.order == "DESC" || b.order == "DESC" ? switchOrder = false : switchOrder = true;
    if (a.countCities > b.countCities) {
        comparison = (switchOrder ? 1 : -1);
    } else if (a.countCities < b.countCities) {
        comparison = (switchOrder ? -1 : 1);
    }

    return comparison;
}

export async function getPathFileById(idFile) {
    let files = await getAllFilesFromDir(PATH_STATE_FILES)
    let file = files.filter(file => file.split('.')[0].split("_")[1] == idFile)
    return pathFilterFiles + file[0];
}

function getAllFilesFromDir(dirname) {
    return fs.promises.readdir(dirname).then(files => {
        return files;
    });
}