var urls = "https://pokeapi.co/api/v2/pokemon/?limit=150";
var pokemonData = new Array();
var lista = async () => {
  try {
    var response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=150");
    var result = await response.json();
    
    // crear un bucle que itere las url
    for (var data of result.results) {
      var pokemonUrl = data.url;
      // abrir las url con un fetch para obtener la informacion basica
      var pokemonUrlFetch = await fetch(pokemonUrl);
      var pokemonResult = await pokemonUrlFetch.json();

      //probando realizar un 2do fetch
      var typeUrl = pokemonResult.types[0].type.url;
      var typeFetch = await fetch(typeUrl);
      var typeResult = await typeFetch.json();

      //mapear datos
      const pokemons = {
        Name: pokemonResult.name,
        Hp: pokemonResult.stats[0].base_stat,
        Id: pokemonResult.id,
        Abilities: pokemonResult.abilities
          .map((skill) => skill.ability.name)
          .join(", "),
        type: pokemonResult.types.map((type) => type.type.name).join(", "),
        Weakness: typeResult.damage_relations.double_damage_from
          .map((weak) => weak.name)
          .join(", "),
        Resistance: typeResult.damage_relations.half_damage_from
          .map((halfDmg) => halfDmg.name)
          .join(", "),
        imgSrc: pokemonResult.sprites.other.dream_world.front_default,
      };

      //printPokedex(pokemons);

      pokemonData.push(pokemons);

      //console.log(pokemons);
    }
    console.log(pokemonData);
    printPokedex(pokemonData);

    
    //funcion para imprimir
  } catch (error) {
    console.error(error);
  }
};


function printPokedex(pokemonData) {
  var olPrint = document.querySelector("#pokedex");
  olPrint.innerHTML = ""; // Limpiar el contenido anterior

  pokemonData.forEach((pokemon) => {
    var tempPokemonDiv = document.createElement("div");
    tempPokemonDiv.innerHTML = `
      <p>Pokemon Id: ${pokemon.Id}</p>
      <p>Nombre : ${pokemon.Name}</p>
      <p>Tipo : ${pokemon.type}</p>
      <p>Habilidades : ${pokemon.Abilities}</p>
      <p>Hp base : ${pokemon.Hp}</p>
      <p>Debilidad : ${pokemon.Weakness}</p>
      <p>Resistencia : ${pokemon.Resistance}</p>
    `;
    olPrint.appendChild(tempPokemonDiv);
  });
}


function filterPokemons(type) {
  var filteredPokemons = pokemonData.filter((pokemon) =>
    pokemon.type.includes(type));

  var olPrint = document.querySelector("#pokedex");
  olPrint.innerHTML = " ";

  printPokedex(filteredPokemons);
  console.log(filteredPokemons);
 
}

function refreshPage(){
  window.location.reload();
} 



var init = async () => {
  await lista();
  printPokedex(pokemonData);
  
  
};

init();
