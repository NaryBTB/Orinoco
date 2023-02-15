

/* 1-Déclaration de variables */
const url = 'http://localhost:3000/api/furniture/';
const parameters = new URLSearchParams(window.location.search) // URLSearchParams : définit des méthodes utilitaires pour travailler avec la chaîne de requête (les paramètres GET) d’une URL
const id = parameters.get("id") // extraire l'id de la "furniture" depuis l'URL de la page

const article = document.querySelector('article'); // sélection de la "div" dans laquelle la balise <article> va être créée par le JavaScript


/* 2-Envoyer une demande réseau et obtenir des informations du produit */
const getOneFurniture = async (productUrl, productId) => {
    const response = await fetch(productUrl + productId); // "promesse" que l'URL du produit et l'id du produit soient obtenues
    return await response.json(); // Résultat au format json
}

/* 3-Afficher un produit et ajout au panier */
const displayProduct = async () => {
    const data = await getOneFurniture(url, id); // "promesse" que l'URL du produit et l'id du produit soient récupérées depuis le tableau de l'API
    renderFurniture(data); // la fonction renderFurniture est appelée avec la constante (data) en paramètre
    customizeYourFurniture(article, data.varnish); // La fonction customizeYourFurniture est appelée avec <article> et (data) en paramètre, pour appliquer le vernis correspondant
    addToCart(article, data); // la fonction addToCart est appelée avec <article> et (data) en paramètre, pour ajouter au panier
}

/* 4- Afficher les donnée du produit */
function renderFurniture (productData) { // création d'une "div" pour insérer dans le code HTML 
    article.innerHTML = `
                        
                            <div class="card my-3">
                                <img class="card-img-top img-fluid" src="${productData.imageUrl}" alt="${productData.name}">
                                <div class="card-body">
                                    <h3 class="card-title">${productData.name}</h3>
                                    <h5>${productData.price / 100} €</h5>
                                    <p class="card-text">${productData.description}</p>
                                    <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                                    4.0 Étoiles
                                </div>
                            </div>
                        
                        `;
}

/* 5- Personnalisation du produit */
function customizeYourFurniture (parentElt, productVarnish) { // Création d'un menu déroulant pour sélectionner le vernis choisi
    // Options de personnalisation
    const label = document.createElement('label'); // Création d'une étiquette
    const select = document.createElement('select');// Création d'un sélecteur
    
    label.setAttribute('for', 'varnish-list'); // ajoute l'attribut spécifié à un élément et lui donne la valeur spécifiée
    select.id = "varnish-list"; // renvoie l'élément qui a l'attribut ID avec la valeur spécifiée
    label.innerHTML = `<h4 class="my-5 mr-3">Choisissez votre finition :</h4>`; // retourne le contenu HTML d'un élément
    
    parentElt.appendChild(label); // Création d'une étiquette dans un document HTML
    parentElt.appendChild(select); // Création d'un menu déroulant dans un document HTML

    // Création des options pour chaque vernis avec la méthode for each
    productVarnish.forEach(productVarnish => {
        const option = document.createElement('option'); // Création de l'élément option
        option.value = productVarnish;
        option.textContent = productVarnish;
        select.appendChild(option); // Création des options dans le menu déroulant
    })

    // Retrouver le vernis choisi dans la console
    select.addEventListener('change', (event) => {
        const varnishChosen = event.target.value;
        console.log(varnishChosen); 
    });
}

/* 6-Ajouter le produit au panier */
function addToCart (parentElt, productData) { // création d'un bouton pour ajouter les données du produit au panier
    const btn = document.createElement('btn');
    const div = document.createElement('div');
    btn.innerHTML=`<button type="button" class="btn btn-primary btn-block resp3">Ajouter au panier !</button>`
    div.classList.add('add-to-cart'); // classList.add : ajoute les classes spécifiées
    parentElt.appendChild(div); // appendChild : ajoute un élément dans une liste
    parentElt.appendChild(btn); // création du bouton

    /* Valeurs à ajouter au "local storage" (type de stockage Web qui permet aux applications JavaScript de stocker et d'accéder 
    aux données directement dans le navigateur sans date d'expiration) */
    const product = [productData._id, productData.name, productData.price, productData.imageUrl, productData.description];
    // Attachez un événement click à un élément <button>
    btn.addEventListener('click', () => {
        localStorage.setItem(productData.name, JSON.stringify(product)); // la méthode JSON.stringify () convertit les objets JavaScript en chaînes
        btn.classList.add('invisible') // permet au premier bouton de disparaître au profit du second
        div.innerHTML = '<button type="button" class="btn btn-success btn-block">Le produit a bien été ajouté à votre panier !</button>'
    })
}

displayProduct(); // Appeller la fonction displayProduct