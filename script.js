function carrousel(){
document.body.onload = function() {
    let nbr = 5;
    let p = 0;
    let container = document.getElementsByClassName("container")[0]; // Récupère le premier élément avec la classe "container"

    if (!container) {
        console.error("L'élément .container n'existe pas !");
        return;
    }

    let g = document.getElementsByClassName("g")[0]; // Bouton gauche
    let d = document.getElementsByClassName("d")[0]; // Bouton droit

    container.style.width = (800 * nbr) + "px"; // Ajuste la largeur du carrousel

    for (let i = 1; i <= nbr; i++) {
        let div = document.createElement("div");
        div.className = "photo";
        div.style.backgroundImage = "url('img/chat" + i + ".jpg')"; // Change le nom du fichier d'image dynamiquement
        container.appendChild(div); // Ajoute l'image au carrousel
    }
    


    g.onclick = function() {
        if(p>-nbr+1){
        p--;
        container.style.transform="translate("+p*800+"px)";
        container.style.transition="all 0.3s ease";
        }
        afficherMasquer();
    }

    d.onclick = function() {
        if(p<0)
        p++;
        container.style.transform="translate("+p*800+"px)";
        container.style.transition="all 0.3s ease";
        if (index > rows.length - 1) { 
            cercles[index].classList.remove("visible");
            cercles[index].classList.add("hidden"); 
            cercles[index - 1].classList.add("visible"); // Passe à l'élément suivant
        }
        afficherMasquer();
    }
afficherMasquer();

function afficherMasquer(){
    if(p==-nbr+1){
        g.style.visibility = "hidden";
    }else{
        g.style.visibility = "visible";
    }
    if(p==0){
        d.style.visibility = "hidden";
    }else{
        d.style.visibility = "visible";
    }
}
}
}
function messageEnvoyeForm(){
window.addEventListener('DOMContentLoaded', function() {
    // Attend que le DOM soit complétement chargé avant de lancer l'animation
    const form = document.getElementById('adoption-form');
    // Récupére le formulaire par son ID
    if (form) {
        // Si le formulaire existe, lance l'animation
        form.addEventListener('submit', handleSubmit);
        // Ajoute un écouteur sur l'événement submit du formulaire
    }
    document.addEventListener('keydown', function(e) {
    //Ajoute un écouteur pour les touches du clavier
        if (e.key === 'Escape') {
        // Si la touche pressée est la touche Échap
            const existingMessage = document.querySelector('.confirmation-message');
            // Cherche si un message de confirmation existe
            if (existingMessage) {
            hideConfirmation();
            // Cache le message s'il existe
            }
        }
    });
});

// Création du message de confirmation

function createConfirmationMessage() {
    // Crée un message de confirmation dans une nouvelle div
    const confirmationMessage = document.createElement('div');
    // Ajout de la classe CSS
    confirmationMessage.className= 'confirmation-message';
    // Définit le contenu HTML du message de confirmation
    confirmationMessage.innerHTML = `
    <div class="confirmation-content">
        <div class="confirmation-icon"> ✓ </div>
        <h3>Message envoyé avec succès !</h3>
        <p>Je vous répondrai dans les plus brefs délais.</p>
        <button class="close-btn">Fermer</button>
    </div>
    `;

    // Ajouter les écouteurs d'événements
    confirmationMessage.addEventListener('click', function(e) {
        if (e.target === this){
            // si on clique sur l'arrière plan (pas sur le contenu)
        }
    });

    confirmationMessage.querySelector('.close-btn').addEventListener('click', hideConfirmation);
    // Ajoute un écouteur sur le bouton de fermeture
    
    // Ajouter le message de confirmation au DOM
    document.body.appendChild(confirmationMessage);

    // Déclencher l'animation
    setTimeout(function() {
        confirmationMessage.classList.add('active');
        // Ajouter la classe CSS "active" après un court délai pour l'animation
    }, 10);

    return confirmationMessage;
}


// Affichage du message de confirmation
function showConfirmation() {
    // Supprimer l'ancien message de confirmation s'il existe
    const existingMessage = document.querySelector('.confirmation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    // Créer et afficher le nouveau message de confirmation
    createConfirmationMessage();
}

function hideConfirmation() {
    const confirmationMessage = document.querySelector('.confirmation-message');
    if (confirmationMessage) {
        confirmationMessage.classList.remove('active');
        // Retirer la classe CSS "active" pour l'animation
        setTimeout(()=> {
            confirmationMessage.remove();
            // Supprimer le message de confirmation apres l'animation
        }, 300);
    }
}

// Function de soumission du formulaire
function handleSubmit(e) {
    e.preventDefault();
    // Empeche la soumission du formulaire par défaut

    try{
        const formData = new FormData(this);
        // Créer un objet FormData avec les données du formulaire
        const contactData = {
            raison: formData.get('raison'),
            sujet: formData.get('sujet'),
        };

        // Récupére les valeurs des champs du formulaire
        if (contactData.raison.length < 10) {
            alert('Votre message doit contenir au moins 10 caractères');
            return;
        }

    // Affiche le message de confirmation
    showConfirmation();
    this.reset();
    // Réinitialise le formulaire
    } catch (error) {
        console.error("Une erreur s’est produite lors de la soumission du formulaire :", error);
    }
}
}

carrousel();
messageEnvoyeForm();