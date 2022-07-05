//URLSearchParams -> Récup de l'id produit
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);

/* RECUP DE L ID
const recupIdDansUrl = window.location.search.split("?id=").join("");
console.log(recupIdDansUrl);*/

//appel API
  
    //fetch(`http://localhost:3000/api/products/${recupIdDansUrl}`)
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

  addToCart.onclick = () =>{
    if (quantity.value >0 && quantity.value <100){
    let productAdded ={
      id: id,
      color: colors.value,
      quantity: quantity.value
    }
  
    let panier = [];
  
    if (localStorage.getItem("products") !== null) {
      panier = JSON.parse(localStorage.getItem("products"));
    }
  
    panier.push(productAdded);
    localStorage.setItem("products",JSON.stringify(panier));
    ; 
  }}
  
  //let 
    




          
    
  