import swQuotes from "../quote_module/swQuotes.js"
const renderSWQuote = () => {
  document.querySelector(".starwarsQuote").innerHTML = '"'+swQuotes()+'"'
}

let loadingFetch = false
const cachedCharacters = {}
const cachedPlanets = {}
const cachedSpecies = {}
const cachedVehicles = {}
const cachedStarships = {}

const fetchCharacters = async (counter = 1) => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${counter}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getCharacters = async (counter = 1) => {
  if (cachedCharacters[counter]) {
    return cachedCharacters[counter]
  } else {
    const characters = await fetchCharacters(counter)
    cachedCharacters[counter] = characters
    return cachedCharacters[counter]
  }
}

const renderCharacters = async (counter) => {
  const characterList = document.querySelector(".characters");
  characterList.innerHTML = '<div class="lds-dual-ring"></div>'
  const currentCharacters = await getCharacters(counter)
  characterList.innerHTML = ""
  for (let char of currentCharacters.results) {
    characterList.insertAdjacentHTML("beforeend", `
          <li>${char.name}</li>`)
    document.querySelector("li:last-of-type").addEventListener("click", (e) => {
      if (!loadingFetch) {
        loadingFetch = true
        removeUniqueClass("clickedChar")
        e.target.classList.add("clickedChar")
        renderCharInfo(char)
      }
    })
  }
}

const removeUniqueClass = (className) => {
  if (document.querySelector("." + className)) {
    document.querySelector("." + className).classList.remove(className)
  }
}

const renderCharInfo = (char) => {
  const charContainer = document.querySelector(".charDetails")
  charContainer.innerHTML = '<div class="lds-dual-ring"></div>'
  charContainer.innerHTML = ""
  charContainer.insertAdjacentHTML("beforeend", `
    <h3>${char.name}</h3>`)
  charContainer.insertAdjacentHTML("beforeend", `
    <li>Height: ${char.height} cm</li>
    <li>Mass: ${char.mass} kg</li>
    <li>Hair color: ${char.hair_color}</li>
    <li>Skin color: ${char.skin_color}</li>
    <li>Eye color: ${char.eye_color}</li>
    <li>Birth Year: ${char.birth_year}</li>
    <li>Gender: ${char.gender}</li>
    `)
  loadingFetch = false
  renderInfoTabs()
  renderPlanet(char)
  renderSpecies(char)
  renderVehicles(char)
  renderStarships(char)
}

const renderInfoTabs = () => {
  document.querySelector(".infoTabs").innerHTML = `
    <button>Planet</button>
    <button>Species</button>
    <button>Vehicles</button>
    <button>Starships</button>
    `
}

const fetchPlanet = async (char) => {
  try {
    const response = await fetch(char.homeworld)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getPlanets = async (char) => {
  let planet = char.homeworld.split("/")
  const planetCounter = planet.splice(planet.length - 2, 1)
  if (cachedPlanets[planetCounter]) {
    return cachedPlanets[planetCounter]
  } else {
    const currentPlanet = await fetchPlanet(char)
    cachedPlanets[planetCounter] = currentPlanet
    return cachedPlanets[planetCounter]
  }
}

const renderPlanet = async (char) => {
  const planetsContainer = document.querySelector(".charInfo")
  const planetBtn = document.querySelector(".infoTabs button:nth-of-type(1)")
  planetBtn.classList.add("infoTabBtns")
  planetBtn.addEventListener("click", async () => {
    if (!loadingFetch) {
      loadingFetch = true
      planetsContainer.classList.remove("infoScroll")
      removeUniqueClass("infoTabBtns")
      planetBtn.classList.add("infoTabBtns")
      planetsContainer.innerHTML = '<div class="lds-dual-ring"></div>'
      const currentPlanet = await getPlanets(char)
      planetsContainer.innerHTML = `
          <h3>${currentPlanet.name}</h3>
          <li>Rotation period: ${currentPlanet.rotation_period}</li>
          <li>Orbital period: ${currentPlanet.orbital_period}</li>
          <li>Diameter: ${currentPlanet.diameter}</li>
          <li>Climate: ${currentPlanet.climate}</li>
          <li>Gravity: ${currentPlanet.gravity}</li>
          <li>Terrain: ${currentPlanet.terrain}</li>      
          `
      loadingFetch = false
    }
  })
  document.querySelector(".infoTabs button:nth-of-type(1)").click()
}


const fetchSpecies = async (char) => {
  try {
    const response = await fetch(char.species)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getSpecies = async (char) => {
  if (char.species.length > 0) {
    let specie = char.species[0].split("/")
    const specieCounter = specie.splice(specie.length - 2, 1)
    if (cachedSpecies[specieCounter]) {
      return cachedSpecies[specieCounter]
    } else {
      const currentSpecie = await fetchSpecies(char)
      cachedSpecies[specieCounter] = currentSpecie
      return cachedSpecies[specieCounter]
    }
  }
}

const renderSpecies = async (char) => {
  const planetsContainer = document.querySelector(".charInfo")
  const speciesBtn = document.querySelector(".infoTabs button:nth-of-type(2)")
  speciesBtn.addEventListener("click", async () => {
    if (!loadingFetch) {
      loadingFetch = true
      planetsContainer.classList.remove("infoScroll")
      removeUniqueClass("infoTabBtns")
      speciesBtn.classList.add("infoTabBtns")
      planetsContainer.innerHTML = '<div class="lds-dual-ring"></div>'
      const currentSpecie = await getSpecies(char)
      if (!currentSpecie) {
        planetsContainer.innerHTML = `<h3>Unknown</h3>`
      } else {
        planetsContainer.innerHTML = `
            <h3>Name: ${currentSpecie.name}</h3>
            <li>classsification: ${currentSpecie.classification}</li>
            <li>Designation: ${currentSpecie.designation}</li>
            <li>Average height: ${currentSpecie.average_height}</li>
            <li>Skin colors: ${currentSpecie.skin_colors}</li>
            <li>Hair colors: ${currentSpecie.hair_colors}</li>
            <li>Eye color: ${currentSpecie.eye_colors}</li>
            <li>Average lifespan: ${currentSpecie.average_lifespan}</li>
            <li>Language: ${currentSpecie.language}</li>
            `
      }
      loadingFetch = false
    }
  })
}

const fetchVehicles = async (vehicle) => {
  try {
    const response = await fetch(vehicle)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getVehicles = async (char) => {
  let vehicle = char
  let thisVehicle = vehicle.split("/")
  console.log(thisVehicle)
  const vehicleCounter = thisVehicle.splice(thisVehicle.length - 2, 1)
  if (cachedVehicles[vehicleCounter]) {
    return cachedVehicles[vehicleCounter]
  } else {
    const currentVehicle = await fetchVehicles(vehicle)
    cachedVehicles[vehicleCounter] = currentVehicle
    return cachedVehicles[vehicleCounter]
  }
}

const renderVehicles = (char) => {
  const planetsContainer = document.querySelector(".charInfo")
  const vehiclesBtn = document.querySelector(".infoTabs button:nth-of-type(3)")
  vehiclesBtn.addEventListener("click", async () => {
    if (!loadingFetch) {
      loadingFetch = true
      removeUniqueClass("infoTabBtns")
      vehiclesBtn.classList.add("infoTabBtns")
      planetsContainer.innerHTML = ""
      planetsContainer.classList.add("infoScroll")
      if (char.vehicles.length > 0) {
        for (const vehicle of char.vehicles) {
          const currentVehicle = await getVehicles(vehicle)
          planetsContainer.innerHTML += `
              <h3>Name: ${currentVehicle.name} </h3>
              <li>Model: ${currentVehicle.model} </li>
              <li>Manufacturer: ${currentVehicle.manufacturer} </li>
              <li>Cost in credits: ${currentVehicle.cost_in_credits} </li>
              <li>Length: ${currentVehicle.length} </li>
              <li>Max atmosphering speed: ${currentVehicle.max_atmosphering_speed} </li>
              <li>Crew: ${currentVehicle.crew} </li>
              <li>Passengers: ${currentVehicle.passengers} </li>
              <li>Cargo capacity: ${currentVehicle.cargo_capacity} </li>
              <li>Consumables: ${currentVehicle.consumables} </li>`
        }
      } else {
        planetsContainer.classList.remove("infoScroll")
        planetsContainer.innerHTML = `<h3>Unknown</h3>`
      }
      loadingFetch = false
    }
  })
}


const getStarships = async (ship) => {
  let starship = ship
  let thisStarship = starship.split("/")
  const starshipCounter = thisStarship.splice(thisStarship.length - 2, 1)
  if (cachedStarships[starshipCounter]) {
    return cachedStarships[starshipCounter]
  } else {
    const currentStarship = await fetchStarships(starship)
    cachedStarships[starshipCounter] = currentStarship
    return cachedStarships[starshipCounter]
  }
}

const renderStarships = async (char) => {
  const planetsContainer = document.querySelector(".charInfo")
  const starShipBtn = document.querySelector(".infoTabs button:nth-of-type(4)")
  starShipBtn.addEventListener("click", async () => {
    if (!loadingFetch) {
      loadingFetch = true
      removeUniqueClass("infoTabBtns")
      starShipBtn.classList.add("infoTabBtns")
      planetsContainer.innerHTML = ""
      planetsContainer.classList.add("infoScroll")
      if (char.starships.length > 0) {
        for (const starship of char.starships) {
          const currentStarship = await getStarships(starship)
          planetsContainer.innerHTML += `
          <h3>Name: ${currentStarship.name} </h3>
          <li>Model: ${currentStarship.model} </li>
          <li>Manufacturer: ${currentStarship.manufacturer} </li>
          <li>Cost in credits: ${currentStarship.cost_in_credits} </li>
          <li>Length: ${currentStarship.length} </li>
          <li>Max atmosphering speed: ${currentStarship.max_atmosphering_speed} </li>
          <li>Crew: ${currentStarship.crew} </li>
          <li>Passengers: ${currentStarship.passengers} </li>
          <li>Cargo capacity: ${currentStarship.cargo_capacity} </li>
          <li>Consumables: ${currentStarship.consumables} </li>
          <li>Hyperdrive rating: ${currentStarship.hyperdrive_rating} </li>
          <li>MGLT: ${currentStarship.MGLT} </li>
          <li>Starship Class: ${currentStarship.starship_class} </li>
          `
        }
      } else {
        planetsContainer.classList.remove("infoScroll")
        planetsContainer.innerHTML = `<h3>Unknown</h3>`
      }
      loadingFetch = false
    }
  })
}
const fetchStarships = async (starship) => {
try {
  const response = await fetch(starship)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const paginator = () => {
  let counter = 1
  const numberList = document.querySelector(".numberList")
  const nextBtn = document.querySelector(".nextBtn")
  const prevBtn = document.querySelector(".prevBtn")
  nextBtn.addEventListener("click", () => {
    if (!loadingFetch) {
      loadingFetch = true
      counter++
      numberList.innerText++
      if (counter >= 9) {
        nextBtn.style.visibility = "hidden"
      } else {
        prevBtn.style.visibility = "visible"
      }
      renderCharacters(counter)
    }
    loadingFetch = false
  })

  prevBtn.addEventListener("click", () => {
    if (!loadingFetch) {
      loadingFetch = true
      counter--
      numberList.innerText--
      if (counter <= 1) {
        prevBtn.style.visibility = "hidden"
      } else {
        nextBtn.style.visibility = "visible"
      }
      renderCharacters(counter)
      loadingFetch = false
    }
  })
}

const main = () => {
  renderCharacters()
  paginator()
  renderSWQuote()
};
main();