

/* 1-Les variables */
const cart = document.querySelector('#cart'); // Lier le panier avec js
const cartTotal = document.getElementById('cart-total'); //Lier le total du panier en js

const cartInformation = { // Création de tableaux vides des éléments "contact" et "products" afin de les remplir avec les données
    contact: {},
    products: []
}

let totalPrice = 0; // Déclaration de la variable totalPrice à "0"


/* 2-Récupérer les éléments du localStarage */
const getCart = async (index) => {
    return await JSON.parse(localStorage.getItem(localStorage.key(index)))
}

/* 3-Afficher les produits dans le panier */
const displayCart = async () => {
    if(localStorage.length > 0) { 
        for (let i = 0; i < localStorage.length; i++) { // Énumérer chaque produit du localStorage
        const product = await getCart(i) // Aller chercher les informations contenues dans le localStorage provenant de la fonction getCart
        const furnitureId = product[0]; // Stocker par id
        const furnitureName = product[1]; // Stocker par nom
        const furniturePrice = product[2] / 100; // Stocker par prix
        const furnitureImg = product[3]; // Stocker par image
        const furnitureDescription = product[4]; // Stocker par description
        cartInformation.products.push(furnitureId); // Ajouter l'id du produit à cartInformation

        renderCart(furnitureName, furniturePrice, furnitureImg, furnitureDescription) // Permet aux produits d'être affichés (nom, prix, img, description)
        const remove = document.querySelectorAll('.remove')[i]; // Renvoie tous les éléments du document qui correspondent à un ou plusieurs sélecteurs CSS spécifiés (ici class="remove")
        const article = document.querySelectorAll('article')[i]; // idem (ici balise <article>)

        deleteCart(remove, article, furnitureName) // Permet aux produits d'être éffacés
        }
    } else {
        cart.innerHTML = '<h4>Votre panier est vide.</h4>'; // Retourne le contenu HTML d'un élément
        form.classList.add('invisible') // Permet qu'il soit "invisible"
    }   
}

/* 4-Permettre aux produits d'être affichés dans un document HTML */
const renderCart = (productName, productPrice, imgUrl, productDescription) => {
    // Afficher les produits dans le panier
    const article = document.createElement('article');
    article.innerHTML = `

                  <table class="table table-hover table-condensed">
                    <thead>
                      <tr>
                        <th style="width:50%">Produit</th>
                        <th style="width:10%">Prix</th>
                        <th style="width:8%">Quantité</th>
                        <th style="width:22%" class="text-center">Sous-total</th>
                        <th style="width:10%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-th="">
                          <div class="row">
                            <div class="col-sm-2 hidden-xs"><img src="${imgUrl}" width="110" height="100" alt="${productName}" class="img-responsive resp7"/></div>
                            <div class="col-sm-10">
                              <h4 class="nomargin product-title" style="color: #212529; text-shadow: white 0.5px 0.5px, white -0.5px 0.5px, white -0.5px -0.5px, white 0.5px -0.5px;">${productName}</h4>
                              <p style="color: #212529; text-shadow: white 0.5px 0.5px, white -0.5px 0.5px, white -0.5px -0.5px, white 0.5px -0.5px;">${productDescription}</p>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price" class="price"><h6>${productPrice} €</h6></td>
                        <td data-th="Quantity">
                          <input type="number" class="form-control text-center" value="1">
                        </td>
                        <td data-th="Subtotal" class="text-center">${productPrice} €</td>
                        <td data-th="">
                          <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                          <button class="btn btn-danger btn-sm remove"><i class="fa fa-trash-o"></i></button>								
                        </td>
                      </tr>
                    </tbody>
                  </table>
         
                      `
    cart.insertBefore(article, cartTotal); // Insérer le contenu de <article> avant cartTotal
    
    totalPrice += productPrice; // Création du prix réel (productPrice ajouté à totalPrice 
    cartTotal.innerHTML = `<h2 type="button" class="btn btn-success btn-lg p-4 float-right mr-5 mt-4">Total : ${totalPrice} €</h2>`; // Afficher le pris total dans la page
}
/* 5-Éffacer un produit du panier au click */
const deleteCart = (removeElt, container, productName) => {
    removeElt.addEventListener('click', async () => { // Écouter les événement "click"
        await localStorage.removeItem(productName); // Éffacer un item du localStorage
        container.remove(); // Éffacer un item du DOM
        location.reload(true); // Recharger la page automatiquement
    })
}
displayCart(); // Appeller la fonction displayCart