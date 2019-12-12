let addToy = false
const toyData = "http://localhost:3000/toys"


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const submitButton = document.querySelector('.submit');



  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetchToys();

  submitButton.addEventListener('click', (e) => {

    submitNewToy(e)
  })
})



function fetchToys() {
  return fetch(toyData)
    .then(data => data.json())
    .then(addToys);

}

function addToys(toysObj) {

  for (let i = 0; i < toysObj.length; i++) {
    createToy(toysObj[i])
  }


}




function createToy(toy) {
  const toysDiv = document.querySelector("#toy-collection")
  const card = document.createElement('div');
  // card.class = "card";
  card.setAttribute("class", "card")

  const h2 = document.createElement("h2");
  h2.innerText = toy.name
  card.appendChild(h2);
  const img = document.createElement("img")
  img.setAttribute("class", "toy-avatar")
  img.src = toy.image;

  card.appendChild(img);
  let p = document.createElement('p');
  p.innerText = `${toy.likes} likes`;
  const button = document.createElement("button")
  button.innerText = "like me"
  button.addEventListener("click", function () {
    toyLikes(toy.likes, toy.id);
    p.innerText = `${parseInt(toy.likes) + 1} likes`
  });

  card.appendChild(button);
  card.appendChild(p)

  toysDiv.appendChild(card);

}


function postNewToy(toyObj) {
  fetch(toyData, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify(toyObj)
  }).then(resp => resp.json()).then(data => createToy(data))
}


function submitNewToy(e) {
  e.preventDefault()

  let toyname = document.querySelector('[name=name]').value;
  let toyimage = document.querySelector('[name=image]').value;

  let newToyObj = {
    name: toyname,
    image: toyimage,
    likes: 0
  }


  postNewToy(newToyObj)
}

function toyLikes(like, id) {
  const newLike = parseInt(like) + 1
  const toyObj = {
    likes: newLike
  };

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj)
  });


}
