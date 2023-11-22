// Función que genera el contenido del token NFT
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
      generarTokenNFT(pokemons);
      //console.log(pokemons);
    }
    //console.log(pokemonData);
    //printPokedex(pokemonData);

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
      <p>Name : ${pokemon.Name}</p>
      <p>Type : ${pokemon.type}</p>
      <p>Abilities : ${pokemon.Abilities}</p>
      <p>Hp : ${pokemon.Hp}</p>
      <p>Weakness : ${pokemon.Weakness}</p>
      <p>Resistance : ${pokemon.Resistance}</p>
    `;
    //olPrint.appendChild(tempPokemonDiv);
  });
}

function filterPokemons(type) {
  var filteredPokemons = pokemonData.filter((pokemon) =>
    pokemon.type.includes(type)
  );

  var olPrint = document.querySelector(".containerss");
  //olPrint.innerHTML = " ";

  generarTokenNFT(filteredPokemons);
  //console.log(filteredPokemons);
}

function refreshPage() {
  window.location.reload();
}

//console.log(pokemonData.Hp);

function generarTokenNFT(pokemons) {
  var olPrint = document.querySelector(".pokedex");
  pokemons.forEach(element => { 
  
  var cardBody = `
  <div class="main-container">
  <div class="card-content">
      <img src="	${pokemons.imgSrc}"
           href="www.google.com"alt="">
      <p>${(pokemons.Name)}</p>
      <p id ="hp">HP ${(pokemons.Hp)}</p>
      <p class="content">Our Equilibrium collection promotes balance and calm.</p>
      <div class="price">
          <div class="left">
              
                  <img src=""
                      alt="">
              
              <span>0.041 ETH</span>
          </div>
          <div class="right">
              <img src="https://giologic.github.io/frontend-mentor-nft-card-component-challenge/images/icon-clock.svg" alt="">
              <span>3 days left</span>
          </div>
      </div>
      <div class="auth">
          <p>Creation of <span>Nitin Shrivastava</span></p>
      </div>
  </div>
</div>
    `;

  // Agregar el cuerpo del token al cuerpo del documento
  olPrint.innerHTML = cardBody;
});
}

// Llamar a la función cuando se cargue la página
window.onload = generarTokenNFT;

var init = async () => {
await lista();

  //printPokedex(pokemonData);
};

init();
