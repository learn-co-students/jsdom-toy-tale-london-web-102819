let addToy = false



document.addEventListener("DOMContentLoaded", ()=>{

  const toyCollection = document.querySelector('#toy-collection');
  const newToyForm = document.querySelector(".add-toy-form");
  newToyForm.addEventListener('submit', createNewToy);

  const allToys = fetch("http://localhost:3000/toys")
    .then(data => data.json())
    .then(createAllToys);
  
  
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

  function createAllToys(toys) {
    toys.forEach(toy => createToy(toy));
    // console.log(toys);
  }

  function createNewToy(e) {
    const form = e.target;
    e.preventDefault();
    newToy = {};
    newToy["name"] = form.querySelector("input[name='name']").value;
    newToy["image"] = form.querySelector("input[name='image']").value;
    newToy["likes"] = 0;
    console.log(newToy);
    console.log(e.target);

    configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0
    })}
    createToy(newToy);
    fetch(`http://localhost:3000/toys/`, configurationObject);
  }


  function createToy(toy) {
    toyCard = document.createElement('div');
    toyCard.className = "card";

    toyName = document.createElement('h2');
    toyName.innerText = toy.name;
    toyCard.append(toyName);

    toyImage = document.createElement('img');
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";
    toyCard.append(toyImage);

    toyLikes = document.createElement('p');
    toyLikes.innerText = `${toy.likes} Likes`
    toyCard.append(toyLikes);

    likeButton = document.createElement('button');
    likeButton.innerText = "Like 🦨";
    toyCard.append(likeButton);
    likeButton.addEventListener('click', function() {
      increaseLike(event, toy.id)});

    toyCollection.append(toyCard);

  }

  function increaseLike(event, id) {

    const toyCard = event.target.parentElement;
    const likePara = toyCard.querySelector('p');
    const oldLikes = parseInt(likePara.innerText);

    configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: oldLikes + 1
    })}

    fetch(`http://localhost:3000/toys/${id}`, configurationObject);
    console.log(oldLikes);
    
    likePara.innerText = `${oldLikes + 1} Likes`;

}
  


  

})
