//var pokemonUrls = new Array();
var url = "https://pokeapi.co/api/v2/pokemon/?limit=150";
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

      // console.log(pokemonResult.stats[0]);
      //mapear datos
      const pokemons = {
        Name: pokemonResult.name,
        Hp: pokemonResult.stats[0].base_stat,
        Id: pokemonResult.id,
        Abilities: pokemonResult.abilities.map((skill) => skill.ability.name).join(", "),
        type: pokemonResult.types.map((type) => type.type.name).join(", "),
        Weakness: typeResult.damage_relations.double_damage_from.map((weak) => weak.name).join(", ") ,
        Resistance: typeResult.damage_relations.half_damage_from.map((halfDmg) => halfDmg.name).join(", ") ,
      };
      console.log(pokemons);

      //funcion para imprimir
      printPokedex(pokemons);
    }

    //   pokemonUrl.push(element);
  } catch (error) {
    console.error(error);
  }
};

function printPokedex(pokemons) {
  var olPrint = document.querySelector("#pokedex");
  var tempPokemonDiv = document.createElement("div");
  tempPokemonDiv.innerHTML = `
    <p>Pokemon Id: ${pokemons.Id}</p>
    <p>Name : ${pokemons.Name}</p>
    <p>Type : ${pokemons.type}</p>
    <p>Abilities : ${pokemons.Abilities}</p>
    <p>Hp base : ${pokemons.Hp}</p>
    <p>Weakness : ${pokemons.Weakness}</p>
    <p>Resistance : ${pokemons.Resistance}</p>

    `;
  olPrint.appendChild(tempPokemonDiv);
}

//console.log(pokemonUrl);
var init = async () => {
  await lista();
  
};

init();
