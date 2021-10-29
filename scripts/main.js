renderCharacters = () => {
  const characterList = document.querySelector(".characters");
  fetch(`https://swapi.dev/api/people`)
    .then((response) => response.json())
    .then((data) => {
      for (let char of data.results) {
        characterList.insertAdjacentHTML("beforeend", `
            <li>${char.name}</li>`)
            document.querySelector("li:last-of-type").addEventListener("click", () => {
                renderCharInfo(char)
            })

        }
    });
};

renderCharInfo = (char) => {
    const charContainer = document.querySelector(".charDetails")
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
    document.querySelector(".planetInfo").insertAdjacentHTML
}

main = () => {
  renderCharacters();
};
main();
