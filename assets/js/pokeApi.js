
const pokeApi = {}

function getGenusInEnglish(data) {
    const englishGenus = data.genera.find((genusData) => genusData.language.name === "en")
    if (englishGenus) {
        return englishGenus.genus
    }
}

function getSpecieFromURL(pokeSpecies){
    const specieUrl = pokeSpecies.species.url

    return fetch(specieUrl)
        .then((response) => response.json())
        .then((specieData) => {
            const specie = getGenusInEnglish(specieData)
            return specie
        })

}

function convertPokemonDetailToPokemon(pokeDetail) {
    console.log(pokeDetail)
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] =  abilities

    pokemon.abilities = abilities;
    pokemon.ability = ability;

    return getSpecieFromURL(pokeDetail) .then((specie) => {
        pokemon.specie = specie
        return pokemon
    })
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) =>  Promise.all(detailRequests))
    .then((pokemonsDetails) =>  pokemonsDetails)

}
