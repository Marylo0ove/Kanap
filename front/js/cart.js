let panier = JSON.parse(localStorage.getItem("products"));

// S'il n'y a rien dans le localStorage : affichage d'un message d'erreur
if (!panier){
  alert(`Votre panier est vide !`);
  window.location.href = "index.html";
}

let totalQuantity = 0;
let totalPrice = 0;

for (let product of panier) {
  fetch(`http://localhost:3000/api/products/${product.id}`)
.then((res) => res.json())
.then((data) => {

  let productArticle = document.createElement("article");
    document.getElementById("cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', `${product.id}`);
    productArticle.setAttribute('data-color', `${product.color}`);

    // Insertion de l'élément "div"
  let productDivImg = document.createElement("div");
  productArticle.appendChild(productDivImg);
  productDivImg.className = "cart__item__img";

  // Insertion de l'image
  let productImg = document.createElement("img");
  productDivImg.appendChild(productImg);
  productImg.src = `${data.imageUrl}`;
  productImg.alt = `${data.altTxt}`;

  // Insertion de l'élément "div"
  let productItemContent = document.createElement("div");
  productArticle.appendChild(productItemContent);
  productItemContent.className = "cart__item__content";

  // Insertion de l'élément "div"
  let productItemContentDescription = document.createElement("div");
  productItemContent.appendChild(productItemContentDescription);
  productItemContentDescription.className = "cart__item__content__description";

  // Insertion du titre h3
  let productName = document.createElement("h2");
  productItemContentDescription.appendChild(productName);
  productName.textContent = `${data.name}`;

  // Insertion de la couleur
  let productColor = document.createElement("p");
  productName.appendChild(productColor);
  productColor.textContent = `${product.color}`;

  // Insertion du prix
  let productPrice = document.createElement("p");
  productItemContentDescription.appendChild(productPrice);
  productPrice.textContent = `${data.price} €`;

  // Insertion de l'élément "div"
  let productItemContentSettings = document.createElement("div");
  productItemContent.appendChild(productItemContentSettings);
  productItemContentSettings.className = "cart__item__content__settings";

   // Insertion de l'élément "div"
   let productItemContentSettingsQuantity = document.createElement("div");
   productItemContentSettings.appendChild(productItemContentSettingsQuantity);
   productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

   // Insertion de "Qté : "
   let productQte = document.createElement("p");
   productItemContentSettingsQuantity.appendChild(productQte);
   productQte.textContent = "Qté : ";

   // Insertion de la quantité
   let productQuantity = document.createElement("input");
   productItemContentSettingsQuantity.appendChild(productQuantity);
   productQuantity.setAttribute("type", "number");
   productQuantity.className = "itemQuantity";
   productQuantity.setAttribute("name", "itemQuantity");
   productQuantity.setAttribute("min", "1");
   productQuantity.setAttribute("max", "100");
   productQuantity.value = `${product.quantity}`;
   //productQuantity.addEventListener ('change');

   // Insertion de l'élément "div"
   let productItemContentSettingsDelete = document.createElement("div");
   productItemContentSettings.appendChild(productItemContentSettingsDelete);
   productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

   // Insertion de "p" supprimer
   let productSupprimer = document.createElement("p");
   productItemContentSettingsDelete.appendChild(productSupprimer);
   productSupprimer.className = "deleteItem";
   productSupprimer.textContent = "Supprimer";
   productSupprimer.addEventListener('click', (event) => {
    console.log('clicked');
  event.preventDefault();
  // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
  //let deleteId = product.id;
  //let deleteColor = product.color;

  // filtrer l'élément cliqué par le bouton supprimer
  // en respectant les conditions du callback
  let panierModif = panier.filter( elt => elt.id !== product.id || elt.color !== product.color);
    
  // envoyer les nouvelles données dans le localStorage
  localStorage.setItem('product', JSON.stringify(panierModif));

  // avertir de la suppression et recharger la page
  alert('Votre article a bien été supprimé.');
  window.location.href = "cart.html";
  });

  

  // Affichage du total de la quantité d'article
  let quantityNumber = parseInt(product.quantity);
  totalQuantity = parseInt (totalQuantity) + quantityNumber;
  document.getElementById("totalQuantity").textContent = totalQuantity;
  
  // Affichage du prix
  let priceNumber = parseInt(data.price * product.quantity);
  totalPrice = parseInt (totalPrice) + priceNumber;
  document.getElementById("totalPrice").textContent = totalPrice;

});}

/*/ je supprime un produit dans le panier
function deleteArticle() {
  const deleteItem = document.getElementsByClassName("deleteItem");
  console.log(deleteItem);
  console.log(deleteItem.length);

  for (let k of deleteItem) { 
    
    k.addEventListener('click', (event) => {
      console.log('clicked');
    event.preventDefault();
      
    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let deleteId = product.id;
    let deleteColor = product.color;

    // filtrer l'élément cliqué par le bouton supprimer
    // en respectant les conditions du callback
    let panierModif = panier.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem('product', JSON.stringify(panierModif));

    // avertir de la suppression et recharger la page
    alert('Votre article a bien été supprimé.');
    window.location.href = "cart.html";
    });
  }
}
deleteArticle();

/*function deleteItem() {
  let buttons = document.getElementsByClassName("deleteItem");
  console.log(buttons);
  for (let button of Array.from(buttons)){
      button.addEventListener("click", e => {
        e.preventDefault();
        console.log('clicked');
          let canapeId = e.target.getAttribute("canapeId");
          let canapeColor = e.target.getAttribute("canapeColor");
          const searchDeleteItem = panier.find(element => element.id == canapeId && element.color == canapeColor);
          panier = panier.filter(item => item != searchDeleteItem);
          localStorage.setItem("Canape", JSON.stringify(panier));
          window.location.href = "cart.html";
      })
  }
}
deleteItem();*/

//Suppression
/*let boutonsSupprimer = document.getElementsByClassName("deleteItem")
console.log(boutonsSupprimer);
console.log(boutonsSupprimer.length);
for (let i = 0; i < boutonsSupprimer.length; i++ ) {
  let button = boutonsSupprimer[i]
  button.addEventListener ('click', function (event){
    let buttonClicked = event.target
    console.log('clicked')
  })
}*/

/*function deleteItem(id, color) {
  let panier = getCart();
  for (i = 0; i < panier.length; i++) {
    if (id === panier[i][0] && color === panier[i][1]) {
      panier.splice(i, 1);
      localStorage.setItem("panier", JSON.stringify(panier));
      window.location.reload();
    }
  }
}*/
/* *****************************.  FORMULAIRE.   *********************************** */

/**********************************.      GET ***********************************/ 
//function getForm() {

    // Ajout des Regex
  let form = document.querySelector(".cart__order__form")
  console.log(form);

   //Création des expressions régulières
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

   // Ecoute de la modification et validation du prénom
  form.firstName.addEventListener ('change', function(){
    validFirstName(this);
  });
  const validFirstName = function(inputFirstName) {
    if (charRegExp.test(inputFirstName.value) == false) {
     document.getElementById("firstNameErrorMsg").innerHTML = 'Attention il y a une erreur dans votre prénom !';
  }
    else {
      document.getElementById("firstNameErrorMsg").innerHTML = '';
  }};

   // Ecoute de la modification et validation du nom
  form.lastName.addEventListener ('change', function(){
    validLastName(this);
  });
  const validLastName = function(inputLastName) {
    if (charRegExp.test(inputLastName.value) == false) {
      document.getElementById("lastNameErrorMsg").innerHTML = 'Attention il y a une erreur dans votre nom !';
  } 
    else {
      document.getElementById("lastNameErrorMsg").innerHTML = '';
  }
  };

  // Ecoute de la modification et validation de l'adresse
  form.address.addEventListener ('change', function(){
    validAddress(this);
  });
  const validAddress = function(inputAddress) {
    if (addressRegExp.test(inputAddress.value) == false) {
      document.getElementById("addressErrorMsg").innerHTML = 'Attention il y a une erreur dans votre adresse !'; 
    } 
    else {
      document.getElementById("addressErrorMsg").innerHTML = '';
    }
  };

  // Ecoute de la modification et validation de la ville
  form.city.addEventListener ('change', function(){
    validCity(this);
  });
  const validCity = function(inputCity) {
    if (charRegExp.test(inputCity.value) == false) {
      document.getElementById("cityErrorMsg").innerHTML = 'Êtes-vous certain.e d\'habiter ici ?';
    } 
    else {
      document.getElementById("cityErrorMsg").innerHTML = '';
    }
  };

  // Ecoute de la modification et validation de l'email
  form.email.addEventListener ('change', function(){
    validEmail(this);
  });
  const validEmail = function(inputEmail) {
    if (emailRegExp.test(inputEmail.value) == false) {
      document.getElementById("emailErrorMsg").innerHTML = 'Attention il y a une erreur dans votre email !';
    }
    else {
      document.getElementById("emailErrorMsg").innerHTML = '';
    }
  };
  //getForm();
/* ______________________POST _____________________________*/

function postForm() {
  const order = document.getElementById("order");
  console.log(order);
  order.addEventListener('click', (event) => {
    console.log('cliked');
    event.preventDefault();

  // je récupère les données du formulaire dans un objet
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }
console.log(contact);
})}
function validControl() {
  if (validFirstName(document.getElementById('firstName')) 
  && validLastName(document.getElementById('lastName')) 
  && validAddress(document.getElementById('address')) 
  && validCity(document.getElementById('city')) 
  && validEmail(document.getElementById('email'))) {
    localStorage.setItem('contact', JSON.stringify(contact));
    return true;
  } 
}
validControl()
  postForm();

/*function getTotals(){

  

//suppression
function deleteProduct() {
let btn_supprimer = document.getElementsByClassName("deleteItem");
console.log(btn_supprimer);
console.log(btn_supprimer.length);
for (let j = 0; j < btn_supprimer.length; j++){
  btn_supprimer[j].addEventListener("click" , (event) => {
     // event.preventDefault();

//Selection de l'element à supprimer en fonction de son id ET sa couleur
let idDelete = panier[j].id;
let colorDelete = panier[j].color;

let index = panier.findIndex( el => el.id === idDelete && el.color === colorDelete );
panier.splice(index,1);
localStorage.setItem("panier", JSON.stringify(panier));

//Alerte produit supprimé et refresh
alert("Ce produit a bien été supprimé du panier");
location.reload();
  })
}}   

deleteProduct();*/

/*document.getElementById("cart__items")
    .innerHTML +=
    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${product.color}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;*/