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
    let productAdded ={
      id: id,
      color: colors.value,
      quantity: quantity.value
    }
  
    let panier = [];
    
    if (localStorage.getItem("products") !== null) {
      panier = JSON.parse(localStorage.getItem("products"));
      const found = panier.find(element => element.id == productAdded.id && element.color == productAdded.color);
      console.log(found);

      if (found) {
   
      found.quantity = parseInt(found.quantity) + parseInt(productAdded.quantity);
      localStorage.setItem("products", JSON.stringify(panier));}

    else{
      panier.push(productAdded);
      localStorage.setItem("products",JSON.stringify(panier));
     }
      
      
  }
  else{
    panier.push(productAdded);
    localStorage.setItem("products",JSON.stringify(panier));
  ; }
  
  }

  
    /*const resultFind = panier.find(
        (el) => el.id === id && el.color === colors);
        //Si le produit commandé est déjà dans le panier
        console.log("result find est egal a :");
        console.log(resultFind);
        console.log("fin result find");
  if (resultFind) {
    console.log("resultfind kanap = " + resultFind.quantity);
    console.log("qtykanap = " + quantity);
    let newQuantite = parseInt(quantity) + parseInt(resultFind.quantity);
    console.log("newQtt est egal a : " + newQuantite);
    resultFind.quantity = newQuantite;
    localStorage.setItem("products", JSON.stringify(panier));
    console.log("productCart egal :");
    console.log(productCart);
  console.log("fin productCart");}}*/

  /*if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0)
    alert(`Votre Kanap a bien été ajouté à votre panier !`);
    else
    alert(`Veuillez choisir une quantité de Kanap à ajouter à votre panier`);
    
    const quantityPicked = document.querySelector("#quantity");
const kanapPicked = document.getElementById(title);*/