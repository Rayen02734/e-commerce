document.addEventListener('DOMContentLoaded', function () {
    // Initialiser le panier s'il n'existe pas dans le localStorage
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Mettre à jour l'affichage du panier au chargement
    updateCartDisplay();

    // Ajouter les écouteurs d'événements sur tous les boutons "ADD TO CART"
    const addToCartButtons = document.querySelectorAll('section button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productDiv = this.closest('div');
            const productName = productDiv.querySelector('h3').textContent;
            const productImage = productDiv.querySelector('img').src;

            // Ajouter le produit au panier
            addToCart(productName, productImage);

            // Mettre à jour l'affichage du panier
            updateCartDisplay();

            // Afficher une notification
            showNotification(`${productName} a été ajouté au panier!`);
        });
    });

    // Fonction pour ajouter un produit au panier
    function addToCart(name, image) {
        const cart = JSON.parse(localStorage.getItem('cart'));

        // Vérifier si le produit est déjà dans le panier
        const existingProductIndex = cart.findIndex(item => item.name === name);

        if (existingProductIndex !== -1) {
            // Si le produit existe déjà, augmenter la quantité
            cart[existingProductIndex].quantity += 1;
        } else {
            // Sinon, ajouter le nouveau produit
            cart.push({
                name: name,
                image: image,
                price: generatePrice(name), // Générer un prix basé sur le nom
                quantity: 1
            });
        }

        // Sauvegarder le panier mis à jour
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Fonction pour générer un prix basé sur le nom du produit
    function generatePrice(name) {
        // Utiliser la longueur du nom pour générer un prix "unique"
        const basePrice = name.length * 2.5;
        // Arrondir à 2 décimales
        return Math.round(basePrice * 100) / 100;
    }

    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartTable = document.querySelector('.offcanvas-body .table');

        // Vider le tableau sauf l'en-tête
        while (cartTable.rows.length > 1) {
            cartTable.deleteRow(1);
        }

        // Remplir le tableau avec les produits du panier
        cart.forEach((item, index) => {
            const row = cartTable.insertRow();

            // Numéro de ligne
            const cellIndex = row.insertCell(0);
            cellIndex.textContent = index + 1;

            // Nom et image du produit
            const cellProduct = row.insertCell(1);
            cellProduct.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;">
                    <span>${item.name}</span>
                </div>
            `;

            // Prix
            const cellPrice = row.insertCell(2);
            cellPrice.textContent = `${item.price} €`;

            // Quantité avec contrôles pour augmenter/diminuer
            const cellQuantity = row.insertCell(3);
            cellQuantity.innerHTML = `
                <div style="display: flex; align-items: center; gap: 5px;">
                    <button class="btn btn-sm btn-outline-light quantity-btn" data-action="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-light quantity-btn" data-action="increase" data-index="${index}">+</button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        });

        // Ajouter une ligne pour le total si le panier n'est pas vide
        if (cart.length > 0) {
            const totalRow = cartTable.insertRow();
            totalRow.innerHTML = `
                <td colspan="2" style="text-align: right; font-weight: bold;">Total:</td>
                <td id="cart-total" style="font-weight: bold;">${calculateTotal(cart)} €</td>
                <td></td>
            `;
        }

        // Ajouter les écouteurs d'événements pour les boutons de quantité
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const action = this.getAttribute('data-action');
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, action);
            });
        });

        // Ajouter les écouteurs d'événements pour les boutons de suppression
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    // Fonction pour calculer le total du panier
    function calculateTotal(cart) {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    // Fonction pour mettre à jour la quantité d'un produit
    function updateQuantity(index, action) {
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (action === 'increase') {
            cart[index].quantity += 1;
        } else if (action === 'decrease') {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                // Si la quantité est 1, supprimer le produit
                removeFromCart(index);
                return;
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Fonction pour supprimer un produit du panier
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();

        // Afficher une notification
        showNotification('Produit retiré du panier!');
    }

    // Fonction pour afficher une notification
    function showNotification(message) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '2000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        notification.textContent = message;

        // Ajouter la notification au document
        document.body.appendChild(notification);

        // Afficher la notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Cacher et supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
});