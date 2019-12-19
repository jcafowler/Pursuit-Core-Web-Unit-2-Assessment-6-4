document.addEventListener("DOMContentLoaded", () => {
  let select = document.querySelector("select")
  let form = document.querySelector("form")
  let content = document.querySelector("#content")
  let submissions = document.querySelector("#submissions")

  const populateMovies = async () => {
    let res = await axios.get("https://ghibliapi.herokuapp.com/films")
    let movieList = res.data
    movieList.forEach((el) => {
      let option = document.createElement("option")
      option.innerText = el.title
      option.value = el.id
      select.appendChild(option)
    })
  }
  const displayInfo = async (id) => {
    let res = await axios.get(`https://ghibliapi.herokuapp.com/films/${id}`)
    let movie = res.data

    let title = document.createElement("h3")
    title.className = "title"
    title.innerText = movie.title
    content.appendChild(title)

    let releaseDate = document.createElement("p")
    releaseDate.className = "releaseDate"
    releaseDate.innerText = movie.release_date
    content.appendChild(releaseDate)

    let description = document.createElement("p")
    description.className = "description"
    description.innerText = movie.description
    content.appendChild(description)

  }

  select.addEventListener("change", (e) => {
    content.innerHTML = ""
    displayInfo(e.target.value)
  })
  window.onload = populateMovies()
})