import fs from 'fs';
import { pathApiFiles, pathFilterFiles } from '../database/api/config.js'
import { readFile } from './readFiles.js';

export async function createFilterStateFiles() {
    let states = JSON.parse(await fs.readFileSync(pathApiFiles + 'states.json'));
    let cities = JSON.parse(await fs.readFileSync(pathApiFiles + 'cities.json'));

    makeFiles(states, cities);
}

export async function insertItemFile(data, fileName) {
    const path = pathApiFiles + fileName;
    const content = await readFile(path);
    data.id = getNextId(content);
    content.push(data);
    await fs.writeFileSync(path, JSON.stringify(content, null, 4));
}

const getNextId = (data) => {
    if(data.length <= 0){
        return 0;
    }
    let lastId = data.reduce((a, b) => a.id > b.id ? a : b).id;
    return ++lastId;
}

const makeFiles = (states, cities) => {
    states.map(async state => {
        let citiesFromState = filterCitiesByState(state, cities);
        await fs.writeFileSync(pathFilterFiles + state.Sigla + "_" + state.ID + ".json", JSON.stringify(citiesFromState, null, 4));
    })
}

const filterCitiesByState = (state, cities) => {
    return cities.filter(city => city.Estado === state.ID);
}