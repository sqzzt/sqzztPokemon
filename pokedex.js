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
        weakness: typeResult.damage_relations.double_damage_from
          .map((weak) => weak.name)
          .join(", "),
        doubleto: typeResult.damage_relations.double_damage_to
          .map((dbldmg) => dbldmg.name)
          .join(", "),
        halfdmgto: typeResult.damage_relations.half_damage_to
          .map((hlfdmg) => hlfdmg.name)
          .join(", "),
        resistance: typeResult.damage_relations.half_damage_from
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
console.log(pokemonData);
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
      <p>weakness: ${pokemon.weakness}</p>
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

// Creation of divs, button for fight________________________________________________________//

function fightDiv(pokemon) {
  var pokemonFight1 = document.querySelector(".fullContainer");

  pokemonFight1.innerHTML = `
  <div class = "fightContainer">
    <div class = "closeDiv">
      <div class = "forButton"> <button class = "beautiful-button" onclick = "closeDiv()" ><span>Close</span></button> </div>
      <div class = "pokemon1"><div class="cardforFight">
        <div class="card-img">
          <img src="${pokemon1.imgSrc}" alt="" srcset="">
        </div>
        <div class="card-body">
          <h4>${pokemon1.Name.toUpperCase()}</h4>
          <p>weakness: ${pokemon1.weakness}</p>
          <p>Abilities: ${pokemon1.Abilities}</p>
            <div class="card-body-footer">
              <div>HP ${pokemon1.Hp}</div>  
              <div>Attk ${pokemon1.attk}</div> 
              <div>Def  ${pokemon1.def}</div>
            </div>

          </div>
          <div class="card-footer">
    <img src="https://c0.klipartz.com/pngpicture/569/963/gratis-png-ilustracion-de-pokeball-ash-ketchum-pokeball-s-thumbnail.png" alt="">
    <span> Type: ${pokemon1.type} </span>
</div>
      </div>
      </div>
      <div class = "central">
        <div class = "forFightButton">
          <button class = "fightButton"><span>Fight</span></button>
        </div>
        <div class ="divTexto"></div>
      </div>
      <div class = "pokemon2">
        <div class="cardforFight">
          <div class="card-img">
            <img src="${pokemon2.imgSrc}" alt="" srcset="">
          </div>
          <div class="card-body">
            <h4>${pokemon2.Name.toUpperCase()}</h4>
            <p>Weakness: ${pokemon2.Weakness}</p>
            <p>Abilities: ${pokemon2.Abilities}</p>
            <div class="card-body-footer">
              <div>HP ${pokemon2.Hp}</div>  
              <div>Attk ${pokemon2.attk}</div> 
              <div>Def  ${pokemon2.def}</div>
            </div>

          </div>
          <div class="card-footer">
    <img src="https://c0.klipartz.com/pngpicture/569/963/gratis-png-ilustracion-de-pokeball-ash-ketchum-pokeball-s-thumbnail.png" alt="">
    <span> Type: ${pokemon2.type} </span>
</div>
        </div>
      </div>
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

// add pokemons to fight________________________________________________________________
var weakness = [];
var double = [];

var pokemon1 = 0;
var pokemon2 = 0;
var fightActive = false;

function addToFight(pokemon) {
  if (pokemon1 === 0) {
    pokemon1 = pokemon;
    console.log("Pokemon 1 added to the fight:", pokemon);
  } else if (pokemon2 === 0) {
    pokemon2 = pokemon;
    console.log("Pokemon 2 added to the fight:", pokemon);

    // Ambos pokémons han sido añadidos, puedes realizar acciones adicionales aquí si es necesario
    function alreadyAdd() {
      if (pokemon1 && pokemon2) {
        console.log("Both pokemons already add");
        fightDiv();
      }
    }

    alreadyAdd();

    var click = document.querySelector(".fightButton");
    click.addEventListener("click", (Event) => {
      var effectiveHPPokemon1 = 0.01 * pokemon1.Hp * pokemon1.def + pokemon1.Hp;
      var effectiveHPPokemon2 = 0.01 * pokemon2.Hp * pokemon2.def + pokemon2.Hp;
      var weakfrom = pokemon.weakness;
      var double = pokemon.doubleto;
      var resistance = pokemon.resistance;
      var halfto = pokemon.halfdmgto;
      
      console.log(weakfrom);
      console.log(double);
      console.log(resistance);
      console.log(halfto);
      // Comparar los tipos

      // function call on event
      //fightNow();  //FUNCION ACTIVAS EN CLICK --- activar
    });
  }
}

function resetFight() {
  // Reinicia las variables para la próxima pelea
  pokemon1 = 0;
  pokemon2 = 0;
  fightActive = false;
  console.log("Fight reset. You can now add new pokemons to the fight.");
}

function addPokemonToFight(pokemon) {
  // POKEMON ADD TO FIGHT
  addToFight(pokemon);
}

function dmgCalc(attack, defend) {
  // CALCULATE DMG FUNCTION
  var damage = Math.floor(attack.attk * 0.2);
  console.log(`${attack.Name} deals ${damage} damage to ${defend.Name}`);
  return damage;
}

function fightNow() {
  //FIGHT FUNCTION
  var effectiveHPPokemon1 = 0.01 * pokemon1.Hp * pokemon1.def + pokemon1.Hp;
  var effectiveHPPokemon2 = 0.01 * pokemon2.Hp * pokemon2.def + pokemon2.Hp;


  for (var i = 1; ; i++) {
    console.log(`Battle begin round ${i}`);

    effectiveHPPokemon2 -= dmgCalc(pokemon1, pokemon2);
    if (effectiveHPPokemon2 <= 0) {
      console.log(`${pokemon2.Name} defeat ${pokemon1.Name} win`);
      resetFight();
      hideButton();
      break;
    }

    // Attack from pokemon2 to pokemon1
    effectiveHPPokemon1 -= dmgCalc(pokemon2, pokemon1);
    if (effectiveHPPokemon1 <= 0) {
      console.log(`${pokemon1.Name} defeat ${pokemon2.Name} win`);
      resetFight();
      hideButton();
      break;
    }
  }
}

function hideButton(){
var hideButton = document.querySelector(".fightButton");
hideButton.style.display = "none";
}

var init = async () => {
  await lista();
  printPokedex(pokemonData);
  
};

init();
