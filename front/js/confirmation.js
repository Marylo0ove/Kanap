//Recup de l'id
let str = window.location.href;
console.log(str);
let url = new URL(str);
console.log(url);
let id = url.searchParams.get("id");
console.log(id);
//Affichage de l'id
let orderId = document.getElementById("orderId");
orderId.innerHTML = id;
//LocalStorage vidé
localStorage.clear();