const pokemonStatistics = document.getElementById('contentPokemonStats');
const pokemonId = getQueryParam('id');

function getQueryParam(param){
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}

function loadPokemonStats(pokemonId){
    getPokemonById(pokemonId).then((pokemon) => {
        const newHtmlPokemonStats = `
            <div class="pokemonStats ${pokemon.type}">
                <span class="statsName">${pokemon.name}</span>
                <span class="statsNumber">#${pokemon.number}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                    <div class="detailImg">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
                <div class="stats">
                    <h2>Stats</h2>
                    <div class="detailStats">
                        <ol class="detailStatsName">
                            <li>Species</li>
                            <li>Height</li>
                            <li>Weight</li>
                            <li>Abilities</li>
                        </ol>
                        <ol class="detailStatistics ">
                            <li>${pokemon.specie}</li>
                            <li>${(pokemon.height)/10} cm</li>
                            <li>${(pokemon.weight)/10} Kg</li>
                            <li>Overgrow, Chlorophyll</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
        pokemonStatistics.innerHTML += newHtmlPokemonStats;
    });
}

getPokemonById = (pokemonId) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    return fetch(pokemonUrl)
    .then((response) => response.json())
    .then(convertPokemonDetailToPokemon);
}

loadPokemonStats(pokemonId);
