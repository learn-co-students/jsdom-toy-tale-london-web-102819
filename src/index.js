let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const name = document.querySelector('#name')
  const image = document.querySelector('#image')

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  const getToys = async () => {
    const response = await fetch('http://localhost:3000/toys')
    const data = await response.json()
    displayToys(data)
  }

  const createToy = async (toyData) => { 
    const response = await fetch('http://localhost:3000/toys', {

      method: "POST", 
      headers: {
        "Content-Type":"Application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    })
  }

  function addToy() {
    const form = document.querySelector('form')
    form.addEventListener('submit', function(e) {
      e.preventDefault()
      let data = {
        name: name.value,
        image: image.value
      }
      createToy(data)
    })
  }


  function displayToys(data) {
    console.log(data)
    const toyCollections = document.getElementById('toy-collection')
    let html = ''

  
  data.forEach ((toy) => { 
    let toyCard = document.createElement('div')
    toyCard.classList.add('card')
  html  = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCard.innerHTML = html
    toyCollections.appendChild(toyCard)
  })
  }

  toycard.innerHTNL = html
  toyCollections.appendChild(toyCard)

  const likeBtn = document.querySelector('.like-btn')
  likeBtn.forEach(btn) => {
    btn.addEventListener('click', (e) => {
      let id = toy.idlet increase = toy.likes += 1
      updateLike(id, increase)
    })
  }



  getToys()
  addToy()

})

