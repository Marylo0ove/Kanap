let str = window.location.href;
console.log(str);
let url = new URL(str);
console.log(url);
let id = url.searchParams.get("id");
console.log(id);

let orderId = document.getElementById("orderId");
orderId.innerHTML = id;

localStorage.clear();