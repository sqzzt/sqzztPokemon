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
        attk: pokemonResult.stats[1].base_stat,
        def: pokemonResult.stats[2].base_stat,
      };
      // printPokedex(pokemons);
      pokemonData.push(pokemons);
    }
  } catch (error) {
    console.error(error);
  }
};

//Filtered pokemons fuction _____________________________________________________________________________________________________________________//
function filterPokemons(type) {
  var filteredPokemons = pokemonData.filter((pokemon) =>
    pokemon.type.includes(type)
  );
  console.log(pokemonData.length);
  var olPrint = document.querySelector("#pokedex");
  olPrint.innerHTML = " ";
  printPokedex(filteredPokemons);
}

{
  /* <button style="--clr:#39FF14" id="addPokemon" onclick="fightDiv()"><span>Add Me</span><i></i></button> */
}
//Array pokemons and print in the web _______________________________________________________________//
//LINEA 69 modificar para agregar al array los pokemons
function printPokedex(pokemonData) {
  var olPrint = document.querySelector("#pokedex");
  olPrint.innerHTML = " ";
  pokemonData.forEach((pokemon, index) => {
    var tempPokemonDiv = document.createElement("div");
    tempPokemonDiv.innerHTML = `
<div class="card">

<button style="--clr:#39FF14" id="addPokemon" data-index="${index}">
          <span>Add Me</span><i></i>
        </button>

<div class="card-img">
    <img src="${pokemon.imgSrc}" alt="" srcset="">
    
</div>
  <div class="card-body">
      <h4>${pokemon.Name.toUpperCase()}</h4>
      <p>Weakness: ${pokemon.Weakness}</p>
      <p>Abilities: ${pokemon.Abilities}</p>
      <div class="card-body-footer">
          <div>HP ${pokemon.Hp}</div>  
          <div>Attk ${pokemon.attk}</div> 
          <div>Def  ${pokemon.def}</div>
      
  </div>
<div class="card-footer">
    <img src="https://c0.klipartz.com/pngpicture/569/963/gratis-png-ilustracion-de-pokeball-ash-ketchum-pokeball-s-thumbnail.png" alt="">
    <span> Type: ${pokemon.type} </span>
</div>
</div>
`;
    olPrint.appendChild(tempPokemonDiv);
    console.log(typeof pokemon);
  });

  //  button to add this Pokemon to the var pokemon
  var buttons = document.querySelectorAll("#addPokemon");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      var index = this.getAttribute("data-index");
      addPokemonToFight(pokemonData[index]);
    });
  });
}

//Search fuction in the input _______________________________________________________________//

function searchInput() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var filteredPokemons = pokemonData.filter(
    (pokemon) =>
      pokemon.Name.toLowerCase().includes(searchTerm) ||
      pokemon.type.toLowerCase().includes(searchTerm)
  );
  var olPrint = document.querySelector("#pokedex");
  olPrint.innerHTML = " ";
  printPokedex(filteredPokemons);
}

// Creation of divs and buttons ________________________________________________________//
function fightDiv(pokemon) {
  // var test = document.querySelector("#fightContainer");
  // var closeButton = document.createElement("button");
  // closeButton.setAttribute("class", "beautiful-button");
  // closeButton.innerText = "Close";
  // var closeBot = document.querySelector("beautiful-button");
  // closeButton.setAttribute("onclick", "closeDiv()");
  // var fight = document.createElement("div");
  // var baseDiv = document.createElement("div");
  // baseDiv.setAttribute("class", "baseDiv");
  // fight.setAttribute("class", "letsFight");
  // test.appendChild(baseDiv);
  // baseDiv.appendChild(fight);
  // fight.appendChild(closeButton);

  var pokemonFight1 = document.querySelector(".fullContainer");
  
  pokemonFight1.innerHTML = `
  <div class = "fightContainer">
    <div class = "closeDiv">
      <div class = "forButton"> <button class = "beautiful-button" onclick = "closeDiv()" ><span>Close</span></button> </div>
      <div class = "pokemon1"></div>
      <div class = "central"><div class ="divTexto"></div></div>
      <div class = "pokemon2"></div>
    </div>
  </div>

    `;
  }



// Remove div fuctions_______________________________________________________________//
function closeDiv() {
  var selector = document.querySelector(".fightContainer");
  selector.remove();
  //closeBack();
    

  }

// function closeBack() {
//   var selector = document.querySelector(".fightContainer");
//   selector.style.display = "none"
//   selector.style.display = "initial"

// };

// add pokemons to fight________________________________________________________________

var pokemon1 = 0;
var pokemon2 = 0;

function addToFight(pokemon) {
  if (pokemon1 === 0) {
    pokemon1 = pokemon;
    console.log("Pokemon 1 added to the fight:", pokemon);
  } else if (pokemon2 === 0) {
    pokemon2 = pokemon;
    console.log("Pokemon 2 added to the fight:", pokemon);

    // Ambos pokémons han sido añadidos, puedes realizar acciones adicionales aquí si es necesario
    if (pokemon1 && pokemon2) {
      console.log("los 2 pokemon estan agregados");
      fightDiv();
    }

    // Iniciar la pelea, mostrar información sobre la pelea, etc.

    // Reiniciar pelea - codigo listo
    //resetFight();
  } else {
    console.log("Both pokemons are already added to the fight!");
  }
}

function resetFight() {
  // Reinicia las variables para la próxima pelea
  pokemon1 = 0;
  pokemon2 = 0;
  console.log("Fight reset. You can now add new pokemons to the fight.");
}

function addPokemonToFight(pokemon) {
  addToFight(pokemon);
}

var init = async () => {
  await lista();
  printPokedex(pokemonData);
  //window.onload = printPokedex;
  //fightDiv();
  //console.log(pokemonData);
  //fightDiv();
};

init();
