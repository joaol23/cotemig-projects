import { apiPokemonUrl, limitPokemonsPage } from '../database/api/config.js'
import fetch from 'node-fetch';


// export const routes = [
//     { method: "get", path: '/pokemon', url: `${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0` }
// ]

export function routePokemon(app) {
    app.get("/pokemons", async (req, res) => {
        const pokemons = await getPokemons();
        res.json({ pokemons: pokemons })
    })

    app.get("/pokemon/:name", async (req, res) => {
        const pokemonName = req.params.name;
        res.send(pokemonName);
    })
}

async function getPokemons() {
    let dataPokemons = await fetch(`${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0`);
    dataPokemons = await dataPokemons.json();

    dataPokemons = dataPokemons.results.map(async (pokemon) => {
        let eachPokemonData = await (await fetch(pokemon.url)).json();
        return eachPokemonData;
    })

    return await Promise.all(dataPokemons);
}