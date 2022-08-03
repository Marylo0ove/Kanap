//URLSearchParams -> Récup de l'id produit
let str = window.location.href;
console.log(str);
let url = new URL(str);
console.log(url);
let id = url.searchParams.get("id");
console.log(id);

const quantityPicked = document.querySelector("#quantity");
const kanapPicked = document.getElementById(title);

//appel API
fetch(`http://localhost:3000/api/products/${id}`)
.then((data) => data.json())
.then((products) => {
  console.log(products);
  let title = document.querySelector("title");
  title.innerHTML = products.name;
  let img = document.querySelector(".item__img");
  img.innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}">`;
  let name = document.getElementById("title");
  name.innerHTML = products.name;
  let price = document.getElementById("price");
  price.innerHTML = products.price;
  let description = document.getElementById("description");
  description.innerHTML = products.description;
  let color = document.getElementById("colors");
  for (i = 0; i < products.colors.length; i++) {
    color.innerHTML += `<option value="${products.colors[i]}">${products.colors[i]}</option>`;
  }
});

// Au moment du clic
addToCart.onclick = () =>{
  let productAdded ={
    id: id,
    color: colors.value,
    quantity: quantity.value
  }

  let panier = [];
  // Si 0<quantité<100 ET couleur sélectionnée
  if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0 && productAdded.color != ""){
    //S'il y a déjà un panier, on y cherche l'article, même id même couleur
    if (localStorage.getItem("products") !== null) {
    panier = JSON.parse(localStorage.getItem("products"));
    const found = panier.find(element => element.id == productAdded.id && element.color == productAdded.color);
    console.log(found);
      // Si l'article est déjà présent on actualise la quantité
      if (found) {
      found.quantity = parseInt(found.quantity) + parseInt(productAdded.quantity);
      localStorage.setItem("products", JSON.stringify(panier));
      } 
      // Sinon on l'ajoute
      else{
      panier.push(productAdded);
      localStorage.setItem("products",JSON.stringify(panier));
      }   
    }
    // S'il n'y a pas de panier, on le créé
    else{
    panier.push(productAdded);
    localStorage.setItem("products",JSON.stringify(panier));
    }
  alert(`Votre Kanap a bien été ajouté à votre panier !`); 
  window.location.href = "./cart.html" 
  }
  
  if (quantityPicked.value <= 0)
  alert(`Veuillez choisir une quantité de Kanap à ajouter à votre panier`);
  if (productAdded.color == "")
  alert(`Veuillez choisir une couleur`);
  
}