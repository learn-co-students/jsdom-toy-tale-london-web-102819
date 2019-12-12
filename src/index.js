let addToy = false;

const toysUrl = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const submitButton = document.querySelector(".submit");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  fetchToys();

  submitButton.addEventListener("click", e => {
    submitNewToy(e);
  });
});

function fetchToys() {
  fetch(toysUrl)
    .then(resp => resp.json())
    .then(addToys);
}

function addToys(toysObj) {
  // debugger;
  for (let i = 0; i < toysObj.length; i++) {
    createToyCard(toysObj[i]);
  }
  // debugger;
}

function createToyCard(toy) {
  const div = document.querySelector("#toy-collection");
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  //add h2 name
  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  card.appendChild(h2);

  //add img
  const img = document.createElement("img");
  img.src = toy.image;
  img.setAttribute("class", "toy-avatar");
  card.appendChild(img);

  //add p
  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;
  card.appendChild(p);

  //add like button
  const button = document.createElement("button");
  button.setAttribute("class", "like-btn");
  button.innerText = "Like";
  button.addEventListener("click", function() {
    updateLikes(toy.id, toy.likes);
    p.innerText = `${parseInt(toy.likes) + 1} likes`;
  });
  card.appendChild(button);

  //append card to div
  div.appendChild(card);
}

function updateLikes(id, likes) {
  let newLikes = parseInt(likes) + 1;
  const likeObj = {
    likes: newLikes
  };

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likeObj)
  });
}

function submitNewToy(e) {
  // const submitButton = document.querySelector(".submit");

  // submitButton.addEventListener("click", postNewToy);
  e.preventDefault();

  let name = document.querySelector("#name");
  let image = document.querySelector("#image");

  let formData = {
    name: name.value,
    image: image.value,
    likes: 0
  };

  postNewToy(formData);
}

function postNewToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then(resp => resp.json())
    .then(data => createToyCard(data));
}
