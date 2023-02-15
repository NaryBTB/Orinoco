

/* 1-Déclaration de la variable */
const url= 'http://localhost:3000/api/furniture'

/* 2-Envoyer une demande réseau et obtenir des informations du server : méthode fetch() */
const getFurniture = async (url) => { // async : bloque l'exécution du code asynchrone jusqu'à ce qu'il retourne un résultat
    const response = await fetch(url); // await : attente du résultat ; fetch : "promesse" qu'un résultat nous sera envoyé prochainement
    return await response.json(); // Résultat au format json
}

/* 3-Afficher les produits sur la page d'accueil */
const displayProducts = async () => {
    const products = await getFurniture(url) // "promesse" que l'URL de l'API soit récupérée
    products.forEach(product => { // La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
    renderProduct(product.name, product._id, product.imageUrl, product.price, product.description); // Création du tableau avec les données récupérées
    });
}

/* 4-Appeller la fonction displayProducts */
displayProducts();

/* 5-Afficher chaque produit de la fonction renderProduct */
function renderProduct (productName, productId, productImg, productPrice, productDescription) { // Définition de la fonction
    const products = document.querySelector('#product-item');  // querySelector : renvoie le premier élément qui correspond à un ou plusieurs sélecteurs CSS spécifiés dans le document
    const article = document.createElement('article'); // createElement : crée un élément HTML du type spécifié par tagName ; innerHTML : retourne le contenu HTML d'un élément
    article.innerHTML = `

                <div class="card-deck text-center">
                    <div id="${productId}" class="card mb-4">
                        <img class="card-img-top" src="${productImg}" alt="${productName}">
                        <div class="card-body">
                            <h4 class="card-title">${productName}</h4>
                            <h5>${productPrice / 100} € </h5>
                            <p class="card-text">${productDescription}</p>
                            <a href="produit.html?id=${productId}" class="btn btn-outline-info "><small>Voir le produit</small></a>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <img class="card-img-top" src="${productImg}" alt="${productName}">
                        <div class="card-body">
                            <h4 class="card-title">${productName}</h4>
                            <h5>${productPrice / 100} € </h5>
                            <p class="card-text">${productDescription}</p>
                            <a href="produit.html?id=${productId}" class="btn btn-outline-info "><small>Voir le produit</small></a>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <img class="card-img-top" src="${productImg}" alt="${productName}">
                        <div class="card-body">
                            <h4 class="card-title">${productName}</h4>
                            <h5>${productPrice / 100} € </h5>
                            <p class="card-text">${productDescription}</p>
                            <a href="produit.html?id=${productId}" class="btn btn-outline-info "><small>Voir le produit</small></a>
                        </div>
                    </div>
                </div>
    
                `
    products.appendChild(article); // appendChild : ajoute un élément dans une liste ; création de <article id="product-item"></article>   
}
