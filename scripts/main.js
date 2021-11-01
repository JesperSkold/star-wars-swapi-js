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
          // const liList = document.querySelectorAll("li")
          // console.log(liList)
          // for(let li of liList){
          //   console.log(li)
          //   li.classList.remove(".clickedChar")
          // }
          // document.querySelector("li:last-of-type").classList.remove("clickedChar")
          e.target.classList.add("clickedChar")
          // e.target.insertAdjacentHTML("beforeend", `
          // <span>&#9657</span>
          // `)
          renderCharInfo(char)
        })

      }
    })

};

renderCharInfo = (char) => {
  const charContainer = document.querySelector(".charDetails")
  charContainer.innerHTML = '<div class="lds-dual-ring"></div>'
  const container = document.querySelector(".planetInfo")
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

  container.innerHTML = '<div class="lds-dual-ring"></div>'
  fetch(char.homeworld).then((response) => response.json()).then((data => {
    container.innerHTML = ""
    container.insertAdjacentHTML("beforeend", `
      <h3>${data.name}</h3>
      <li>Rotation period: ${data.rotation_period}</li>
      <li>Orbital period: ${data.orbital_period}</li>
      <li>Diameter: ${data.diameter}</li>
      <li>Climate: ${data.climate}</li>
      <li>Gravity: ${data.gravity}</li>
      <li>Terrain: ${data.terrain}</li>      
      `)
  }))
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
    }else {
      prevBtn.style.visibility = "visible"
    }
    renderCharacters(counter)
  })
  
  
  prevBtn.addEventListener("click", () => {
    counter--
    numberList.innerText--
    if (counter <= 1){
      prevBtn.style.visibility = "hidden"
    }
    else{ 
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
