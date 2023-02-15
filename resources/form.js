

/* 1-Les variables */
const form = document.querySelector('form'); // Lier le formulaire avec js

const containNumber = /[0-9]/; // Les chiffres 
const regexEmail = /.+@.+\..+/; // Une expression régulière JavaScript (ou Regex ) est une séquence de caractères que nous pouvons utiliser pour travailler efficacement avec des chaînes.
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/; // Les caractères spéciaux

const isNotEmpty = value => value !== "" ? true : false; // Vérifier les champs non remplis
const isLongEnough = value => value.length >= 2 ? true : false; // Vérifier si il y a assez de caractères
const doNotContainNumber = value => !value.match(containNumber) ? true : false; // Vérifier s'il n'y a pas de chiffres
const doNotContainSpecialCharacter = value => !value.match(specialCharacter) ? true : false; // Vérifier s'il n'y a pas de caractères spéciaux
const isValidEmail = (value) => value.match(regexEmail) ? true : false; // Vérifier que l'input est au bon format
const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value); // Renvoie true si toutes les conditions sont vérifiées

/* 2-Les éléments du formulaire  */
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById('site-btn'); // Lier le bouton en js (class="site-btn")

const firstNameErrorMessage = document.getElementById('firstNameErrorMessage')
const lastNameErrorMessage = document.getElementById('lastNameErrorMessage')
const addressErrorMessage = document.getElementById('addressErrorMessage')
const cityErrorMessage = document.getElementById('cityErrorMessage')
const emailErrorMessage = document.getElementById('emailErrorMessage')

/* 3-Vérifier les saisies de l'utilisateur */
const formValidate = () => {
        if (isValidInput(firstName.value)) { 
            firstNameErrorMessage.textContent = ""; 
    
        } else {
            firstNameErrorMessage.textContent = "Veuillez renseigner votre prénom"
            firstName.focus();
            return false;
        }
    
        if(isValidInput(lastName.value)) {
            lastNameErrorMessage.textContent = "";
    
        } else {
            lastNameErrorMessage.textContent = "Veuillez renseigner votre nom"
            lastName.focus();
            return false;
        }
    
        if(isNotEmpty(address.value) && isLongEnough(address.value)) {
            addressErrorMessage.textContent = "";
    
        } else {
            addressErrorMessage.textContent = "Veuillez renseigner votre adresse"
            address.focus();
            return false;
        }
    
        if (isValidInput(city.value)) {
            cityErrorMessage.textContent = "";
    
        } else {
            cityErrorMessage.textContent = "Veuillez renseigner votre ville";
            city.focus();
            return false;
        }
    
        if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";
    
        } else {
            emailErrorMessage.textContent = "Veuillez renseigner une adresse e-mail valide"
            email.focus();
            return false;
        }
    
        return cartInformation.contact = { // Si toutes les saisies sont valides, envoyer les objets à cartInformation
                                firstName: firstName.value,
                                lastName: lastName.value,
                                address: address.value,
                                city: city.value,
                                email: email.value
                            }
}



/* 4-Envoyer les données de l'API */
const postData = async (method, url, dataElt) => {
    const response = await fetch(url, {
        headers: {                                  // Les en-têtes représentent un ensemble d'en-têtes HTTP de demande / réponse. Il permet une recherche insensible à la casse de l'en-tête par nom, ainsi que la fusion de plusieurs valeurs d'un seul en-tête.
            'Content-Type' : 'application/json'
        },
        method,                                    // method(String) - Méthode de requête HTTP. Défaut:"GET"
        body: JSON.stringify(dataElt)              // body(String, types de corps ) - corps de la requête HTTP
    })
    return await response.json();
}

btn.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const validForm = formValidate(); // Validation du formulaire
    if (validForm !== false ) {
        const response = await postData('POST', 'http://localhost:3000/api/furniture/order', cartInformation); // Envoyer les données au serveur   
        window.location = `confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Envoyer à la page de confirmation
    }
})