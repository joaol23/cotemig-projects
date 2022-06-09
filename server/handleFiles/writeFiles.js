import fs from 'fs';
import { pathApiFiles, pathFilterFiles } from '../database/api/config.js'

export async function createFilterStateFiles() {
    let states = JSON.parse(await fs.readFileSync(pathApiFiles + 'states.json'));
    let cities = JSON.parse(await fs.readFileSync(pathApiFiles + 'cities.json'));

    makeFiles(states, cities);
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