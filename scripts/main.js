renderCharacters = (counter) => {
  const characterList = document.querySelector(".characters");
  if (counter === undefined) {
    counter = 1
  }

  characterList.innerHTML = '<div class="lds-dual-ring"></div>'
  fetch(`https://swapi.dev/api/people/?page=${counter}`)
    .then((response) => response.json())
    .then((data) => {
      characterList.innerHTML = ""
      for (let char of data.results) {
        characterList.insertAdjacentHTML("beforeend", `
            <li>${char.name}</li>`)
        document.querySelector("li:last-of-type").addEventListener("click", (e) => {
          if (document.querySelector("li.clickedChar")) {
            document.querySelector("li.clickedChar").classList.remove("clickedChar")
          }
          e.target.classList.add("clickedChar")
          renderCharInfo(char)

        })
      }
    })
};

renderCharInfo = (char) => {
  const charContainer = document.querySelector(".charDetails")
  charContainer.innerHTML = '<div class="lds-dual-ring"></div>'
  charContainer.innerHTML = ""
  charContainer.insertAdjacentHTML("beforeend", `
    <h3>${char.name}</h3>`)
  charContainer.insertAdjacentHTML("beforeend", `
    <li>Height: ${char.height}cm</li>
    <li>Mass: ${char.mass}kg</li>
    <li>Hair color: ${char.hair_color}</li>
    <li>Skin color: ${char.skin_color}</li>
    <li>Eye color: ${char.eye_color}</li>
    <li>Birth Year: ${char.birth_year}</li>
    <li>Gender: ${char.gender}</li>
    `)

  document.querySelector(".infoTabs").innerHTML = `
    <button>Planet</button>
    <button>Species</button>
    <button>Vehicles</button>
    <button>Starships</button>
  `
  renderPlanet(char)
  renderSpecies(char)
  renderVehicles(char)
  renderStarships(char)
}

renderPlanet = (char) => {
  const planetsContainer = document.querySelector(".planetInfo")
  const planetBtn = document.querySelector(".infoTabs button:nth-of-type(1)")
  planetBtn.style.backgroundColor = "grey"
  planetBtn.addEventListener("click", () => {
    planetsContainer.classList.remove("infoScroll")
    const otherInfoButtons = document.querySelectorAll(".infoTabs button")
    otherInfoButtons[1].style.backgroundColor = "white"
    otherInfoButtons[2].style.backgroundColor = "white"
    otherInfoButtons[3].style.backgroundColor = "white"
    planetBtn.style.backgroundColor = "grey"
    planetsContainer.innerHTML = '<div class="lds-dual-ring"></div>'
    fetch(char.homeworld).then((response) => response.json()).then((data => {
      console.log(data)
      planetsContainer.innerHTML = `
        <h3>${data.name}</h3>
        <li>Rotation period: ${data.rotation_period}</li>
        <li>Orbital period: ${data.orbital_period}</li>
        <li>Diameter: ${data.diameter}</li>
        <li>Climate: ${data.climate}</li>
        <li>Gravity: ${data.gravity}</li>
        <li>Terrain: ${data.terrain}</li>      
        `
    }))
  })
  document.querySelector(".infoTabs button:nth-of-type(1)").click()
}

renderSpecies = (char) => {
  const planetsContainer = document.querySelector(".planetInfo")
  const speciesBtn = document.querySelector(".infoTabs button:nth-of-type(2)")
  speciesBtn.addEventListener("click", () => {
    planetsContainer.classList.remove("infoScroll")
    speciesBtn.style.backgroundColor = "grey"
    const otherInfoButtons = document.querySelectorAll(".infoTabs button")
    otherInfoButtons[0].style.backgroundColor = "white"
    otherInfoButtons[2].style.backgroundColor = "white"
    otherInfoButtons[3].style.backgroundColor = "white"
    planetsContainer.innerHTML = '<div class="lds-dual-ring"></div>'
    console.log(char.species)
    if (char.species.length > 0) {
      fetch(char.species).then((response) => response.json()).then((data => {
        console.log(data)
        planetsContainer.innerHTML = `
        <h3>Name: ${data.name}</h3>
        <li>classsification: ${data.classification}</li>
        <li>Designation: ${data.designation}</li>
        <li>Average height: ${data.average_height}</li>
        <li>Skin colors: ${data.skin_colors}</li>
        <li>Hair colors: ${data.hair_colors}</li>
        <li>Eye color: ${data.eye_colors}</li>
        <li>Average lifespan: ${data.average_lifespan}</li>
        <li>Language: ${data.language}</li>
        `
      }))
    } else {
      planetsContainer.innerHTML = `<h3>Unknown</h3>`
    }
  })
}

renderVehicles = (char) => {
  const planetsContainer = document.querySelector(".planetInfo")
  const vehiclesBtn = document.querySelector(".infoTabs button:nth-of-type(3)")
  vehiclesBtn.addEventListener("click", () => {
    const otherInfoButtons = document.querySelectorAll(".infoTabs button")
    otherInfoButtons[0].style.backgroundColor = "white"
    otherInfoButtons[1].style.backgroundColor = "white"
    otherInfoButtons[3].style.backgroundColor = "white"
    vehiclesBtn.style.backgroundColor = "grey"
    planetsContainer.innerHTML = ""
    planetsContainer.classList.add("infoScroll")
    for (const vehicle of char.vehicles) {
      console.log(vehicle)
      fetch(vehicle).then((response) => response.json()).then((data) => {
        planetsContainer.innerHTML += `
        <h3>Name: ${data.name} </h3>
        <li>Model: ${data.model} </li>
        <li>Manufacturer: ${data.manufacturer} </li>
        <li>Cost_in_credits: ${data.cost_in_credits} </li>
        <li>Length: ${data.length} </li>
        <li>Max_atmosphering_speed: ${data.max_atmosphering_speed} </li>
        <li>Crew: ${data.crew} </li>
        <li>Passengers: ${data.passengers} </li>
        <li>Cargo_capacity: ${data.cargo_capacity} </li>
        <li>Consumables: ${data.consumables} </li>`
      })
    }
  })
}

renderStarships = (char) => {
  const planetsContainer = document.querySelector(".planetInfo")
  const starShipBtn = document.querySelector(".infoTabs button:nth-of-type(4)")
  starShipBtn.addEventListener("click", () => {
    const otherInfoButtons = document.querySelectorAll(".infoTabs button")
    otherInfoButtons[0].style.backgroundColor = "white"
    otherInfoButtons[1].style.backgroundColor = "white"
    otherInfoButtons[2].style.backgroundColor = "white"
    starShipBtn.style.backgroundColor = "grey"
    planetsContainer.innerHTML = ""
    planetsContainer.classList.add("infoScroll")
    for (const starship of char.starships) {
      console.log(starship)
      fetch(starship).then((response) => response.json()).then((data) => {
        planetsContainer.innerHTML += `
        <h3>Name: ${data.name} </h3>
        <li>Model: ${data.model} </li>
        <li>Manufacturer: ${data.manufacturer} </li>
        <li>Cost_in_credits: ${data.cost_in_credits} </li>
        <li>Length: ${data.length} </li>
        <li>Max_atmosphering_speed: ${data.max_atmosphering_speed} </li>
        <li>Crew: ${data.crew} </li>
        <li>Passengers: ${data.passengers} </li>
        <li>Cargo_capacity: ${data.cargo_capacity} </li>
        <li>Consumables: ${data.consumables} </li>
        <li>Hyperdrive rating: ${data.hyperdrive_rating} </li>
        <li>MGLT: ${data.MGLT} </li>
        <li>Starship Class: ${data.starship_class} </li>
        `
      })
    }
  })
}

paginator = () => {
  let counter = 1
  const numberList = document.querySelector(".numberList")
  const nextBtn = document.querySelector(".nextBtn")
  const prevBtn = document.querySelector(".prevBtn")
  nextBtn.addEventListener("click", () => {
    counter++
    numberList.innerText++
    if (counter >= 9) {
      nextBtn.style.visibility = "hidden"
    } else {
      prevBtn.style.visibility = "visible"
    }
    renderCharacters(counter)
  })


  prevBtn.addEventListener("click", () => {
    counter--
    numberList.innerText--
    if (counter <= 1) {
      prevBtn.style.visibility = "hidden"
    }
    else {
      nextBtn.style.visibility = "visible"
    }
    renderCharacters(counter)
  })
}
main = () => {
  renderCharacters()
  paginator()
};
main();
