let addToy = false

const URL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  loadToys(URL) 

  toyForm.addEventListener('submit', event =>{
    event.preventDefault()
    createToy(event.target)
  })
})

function loadToys(URL) {

   fetch(URL)
  .then(resp => resp.json())
  .then(function(json){
    addToys(json);
  })
}

function addToys(toyHash) {
  toyHash.forEach(addSingleToy)
}

function addSingleToy(element) {
  const toyCollection = document.querySelector("#toy-collection")
  let toyCard = document.createElement('div');
  toyCard.classList.add('card')
  toyCard.innerHTML = (`<h2>${element.name}</h2>
  <input type="hidden" id="${element.id}">
  <img src=${element.image} class="toy-avatar" />
  <p>${element.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `)
  let button = toyCard.querySelector("button");
  button.addEventListener('click', addLike)
  toyCollection.appendChild(toyCard)
}

function addLike(e) {
  let card = e.target.parentElement
  let id = card.querySelector("input").id
  let likes = parseInt(card.querySelector("p").textContent.split(" ")[0])
  // debugger
  const editURL = `http://localhost:3000/toys/${id}`
    let formData = {
      likes: likes + 1
    }
    let configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(editURL, configurationObject).then(resp => resp.json())
    // location.reload()

    card.querySelector('p').innerText = `${parseInt(formData.likes)} Likes`
    // debugger

}

function updateToy(toyData) {

  let name = toyData.name.value;
  let imageUrl = toyData.image.value

  let formData = {
    name: name,
    image: imageUrl,
    likes: "0" 
  }

  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(URL, configurationObject).then(resp => resp.json()).then(obj => addSingleToy(obj))
  
}

function createToy(toyData) {

  let name = toyData.name.value;
  let imageUrl = toyData.image.value

  let formData = {
    name: name,
    image: imageUrl,
    likes: "0" 
  }

  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(URL, configurationObject).then(resp => resp.json()).then(obj => addSingleToy(obj))
  
}

// function addLike(toy)


