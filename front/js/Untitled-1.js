//appel API
function getItems(){
    fetch("http://localhost:3000/api/products")
      .then((data) => data.json())
      .then((products) => {
        console.log(products);
          .innerHTML +=
            `<img src="${products[product].imageUrl}" alt="${products[product].altText}">
            <h1 id="title">${products[product].name}</h1>
            <p>Prix : <span id="price">${products[product].price}</span>€</p>
            <p id="description">${products[product].description}</p>
            <select name="color-select" id="colors">
                <option value="">--SVP, choisissez une couleur --</option>
                <option value="vert">vert</option>
                <option value="blanc">blanc</option>  
            </select>`
        };
        )}
    getItems();