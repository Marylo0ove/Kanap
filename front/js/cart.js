let panier = JSON.parse(localStorage.getItem("products"));

for (let product of panier) {
  fetch(`http://localhost:3000/api/products/${product.id}`)
.then((res) => res.json())
.then(data => {
  document.getElementById("cart__items")
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
              </article>`;
});}

/*function getTotals(){

  // Récupération du total des quantités
  let elemsQtt = document.getElementsByName("itemQuantity");
  console.log(elemsQtt);
  let myLength = elemsQtt.length;
  console.log(elemsQtt.length);
  let totalQtt = 0;

    for (let i = 0; i < elemsQtt.length; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

  // Récupération du prix total
  let totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
      totalPrice += (elemsQtt[i].valueAsNumber * panier[i].data.price);
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

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

function getForm() {

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
      document.getElementById("lastNameErrorMsg").innerHTML = 'Attention il y a une erreur dans votre nom!';
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
      document.getElementById("addressErrorMsg").innerHTML = 'Attention il y a une erreur dans votre adresse!'; 
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

  // Ecoute de la modification et validation de l'email'
  form.email.addEventListener ('change', function(){
    validEmail(this);
  });
  const validEmail = function(inputEmail) {
    if (emailRegExp.test(inputEmail.value) == false) {
      document.getElementById("emailErrorMsg").innerHTML = 'Attention il y a une erreur dans votre email!';
    }
    else {
      document.getElementById("emailErrorMsg").innerHTML = '';
    }
  };
}
getForm();

//{return res.json();}