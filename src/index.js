let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addToyForm = document.querySelector('.add-toy-form');
  addToyForm.addEventListener('submit', createNewToy);

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

  function createNewToy(event) {
    const form = event.target;
    event.preventDefault();
    newToy = {};
    newToy["name"] = form.querySelector("input[name='name']").value
    newToy["image"] = form.querySelector("input[name='image']").value
    newToy["likes"] = 0;
    console.log(event)
    console.log(newToy);
    console.log(event.target);

    configurationObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0
      })
    }
    insertAToy(newToy);
    fetch(`http://localhost:3000/toys/`, configurationObject)
  }

  const allToys = fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(createAllToys)

  function createAllToys(toys) {
    toys.forEach(toy => insertAToy(toy));
    console.log(toys);
  }

  function insertAToy(toy) {
    const toyCollection = document.querySelector('#toy-collection')
    const toyCard = document.createElement('div');
    toyCard.className = 'card';

    const nameTag = document.createElement('h2')
    nameTag.innerText = toy.name;
    toyCard.appendChild(nameTag);

    const imgTag = document.createElement('img')
    imgTag.src = toy.image;
    imgTag.className = 'toy-avatar';
    toyCard.appendChild(imgTag);

    const likeTag = document.createElement('p')
    likeTag.innerText = `${toy.likes} likes`;
    toyCard.appendChild(likeTag);

    const likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.innerText = 'likes'
    toyCard.appendChild(likeButton)
    likeButton.addEventListener('click', function () {
      increaseLikes(event, toy.id)
    });

    toyCollection.appendChild(toyCard)
  }

  function increaseLikes(event, id) {
    const toyCard = event.target.parentElement
    const likeText = toyCard.querySelector('p')
    const oldLikes = parseInt(likeText.innerText)


    configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: oldLikes + 1
      })
    }

    fetch(`http://localhost:3000/toys/${id}`, configurationObject);
    console.log(oldLikes)

    likeText.innerText = `${oldLikes + 1} Likes`;
  }
})
