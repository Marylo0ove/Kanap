// Récupération du panier
let panier = JSON.parse(localStorage.getItem("products"));

// S'il n'y a rien dans le localStorage ou bien que le panier est vide : affichage d'un message d'erreur
if (!panier || panier == 0 ){
  alert(`Votre panier est vide !`);
  window.location.href = "index.html";
}

let totalQuantity = 0;
let totalPrice = 0;

/*********************   Affichage de chaque produit du panier
                            modification de sa quantité
                            suppression de l'article  *********************/

for (let product of panier) {
  fetch(`http://localhost:3000/api/products/${product.id}`)
  .then((res) => res.json())
  .then((data) => {

    // Création de l'élément "article"  
    let productArticle = document.createElement("article");
    document.getElementById("cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', `${product.id}`);
    productArticle.setAttribute('data-color', `${product.color}`);

    // Création de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Création de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = `${data.imageUrl}`;
    productImg.alt = `${data.altTxt}`;

    // Création de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Création de l'élément "div"
    let productItemContentDescription = document.createElement("div");
    productItemContent.appendChild(productItemContentDescription);
    productItemContentDescription.className = "cart__item__content__description";

    // Création du titre h2
    let productName = document.createElement("h2");
    productItemContentDescription.appendChild(productName);
    productName.textContent = `${data.name}`;

    // Création de la couleur
    let productColor = document.createElement("p");
    productName.appendChild(productColor);
    productColor.textContent = `${product.color}`;

    // Création du prix
    let productPrice = document.createElement("p");
    productItemContentDescription.appendChild(productPrice);
    productPrice.textContent = `${data.price} €`;

    // Création de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Création de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    // Création de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.textContent = "Qté : ";

    // Création de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.setAttribute("type", "number");
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("name", "itemQuantity");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.value = `${product.quantity}`;
         // Modification de la quantité
    productQuantity.addEventListener('change', (event) => {
      if (productQuantity.value > 0 && productQuantity.value <=100 && productQuantity.value != 0){
        let productQuantityValue = productQuantity.valueAsNumber;
        const found = panier.find(element => element.productQuantityValue !== product.quantity)
        found.quantity = productQuantity.valueAsNumber;
        product.quantity = found.quantity;
        localStorage.setItem("products", JSON.stringify(panier));
        location.reload();
        alert('La quantité de Kanap a bien été mise à jour !');
      }
      else {
        alert('Veuillez choisir une quantité comprise entre 0 et 100 !')
      }
    })

    // Création de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Création de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.textContent = "Supprimer";
        // Action de supprimer
    productSupprimer.addEventListener('click', (event) => {
      event.preventDefault();
      let panierModif = panier.filter( element => element.id !== product.id || element.color !== product.color);  
      localStorage.setItem("products", JSON.stringify(panierModif));
      location.reload();
      alert('Votre article a bien été supprimé.');
      window.location.href = "cart.html";
    });

    // Affichage du total de la quantité d'article
    let quantityNumber = parseInt(product.quantity);
    console.log(quantityNumber);
    totalQuantity = parseInt (totalQuantity) + quantityNumber;
    document.getElementById("totalQuantity").textContent = totalQuantity;

    // Affichage du prix
    let priceNumber = parseInt(data.price * product.quantity);
    totalPrice = parseInt (totalPrice) + priceNumber;
    document.getElementById("totalPrice").textContent = totalPrice;
  });
}

/* *****************************  FORMULAIRE   *********************************** */

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
   return false
  }
  else {
    document.getElementById("firstNameErrorMsg").innerHTML = '';
    return true
  }
};
 // Ecoute de la modification et validation du nom
form.lastName.addEventListener ('change', function(){
  validLastName(this);
});
const validLastName = function(inputLastName) {
  if (charRegExp.test(inputLastName.value) == false) {
    document.getElementById("lastNameErrorMsg").innerHTML = 'Attention il y a une erreur dans votre nom !';
    return false
  } 
  else {
    document.getElementById("lastNameErrorMsg").innerHTML = '';
    return true
  }
};
// Ecoute de la modification et validation de l'adresse
form.address.addEventListener ('change', function(){
  validAddress(this);
});
const validAddress = function(inputAddress) {
  if (addressRegExp.test(inputAddress.value) == false) {
    document.getElementById("addressErrorMsg").innerHTML = 'Attention il y a une erreur dans votre adresse !';
    return false 
  } 
  else {
    document.getElementById("addressErrorMsg").innerHTML = '';
    return true
  }
};
// Ecoute de la modification et validation de la ville
form.city.addEventListener ('change', function(){
  validCity(this);
});
const validCity = function(inputCity) {
  if (charRegExp.test(inputCity.value) == false) {
    document.getElementById("cityErrorMsg").innerHTML = 'Êtes-vous certain.e d\'habiter ici ?';
    return false
  } 
  else {
    document.getElementById("cityErrorMsg").innerHTML = '';
    return true
  }
};
// Ecoute de la modification et validation de l'email
form.email.addEventListener ('change', function(){
  validEmail(this);
});
const validEmail = function(inputEmail) {
  if (emailRegExp.test(inputEmail.value) == false) {
    document.getElementById("emailErrorMsg").innerHTML = 'Attention il y a une erreur dans votre email !';
    return false
  }
  else {
    document.getElementById("emailErrorMsg").innerHTML = '';
    return true
  }
};
/* ______________________POST _____________________________*/

function setForm() {
  const contact = {
    "firstName" : document.getElementById('firstName').value,
    "lastName" : document.getElementById('lastName').value,
    "address" : document.getElementById('address').value,
    "city" : document.getElementById('city').value,
    "email" : document.getElementById('email').value 
  }
  console.log(contact);

  let productsOrder = [];
  for (let product of panier) {
      productsOrder.push(product.id);
  }
  console.log(productsOrder);

  let order = {
    "contact" : contact,
    "products" : productsOrder
  }
  console.log(order);

  //Lorsque tous les champs sont valides, on envoit contact dans le localStorage
  function validControl() {
    if (validFirstName(document.getElementById('firstName')) 
    && validLastName(document.getElementById('lastName')) 
    && validAddress(document.getElementById('address')) 
    && validCity(document.getElementById('city')) 
    && validEmail(document.getElementById('email'))) {
      localStorage.setItem('contact', JSON.stringify(contact));
      return true;
    } 
  };
 
  //Si les champs sont valides, on envoit order à l'API
  if (validControl() == true) {
    fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'  
          },  
    })
      // Puis on récupère la réponse qui est l'id de la commande
      .then(res => { if(res.ok) return res.json();})
          .then(e => {
            console.log(e.orderId);
            window.location.href = `confirmation.html?id=${e.orderId}`
          });
  }
}
// Au moment du clic on éxécute tout
function postForm() {
  const boutonOrder = document.getElementById("order");
  boutonOrder.addEventListener('click', (event) => {
    console.log('cliked');
    event.preventDefault();
    setForm();
  })
}
postForm();
  