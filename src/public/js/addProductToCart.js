const addListeners = () => {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

const addToCart = async (event) => {
    const productId = event.target.dataset.id;
    // Obtener cartId de localStorage o crear uno nuevo
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        // Si no hay un cartId almacenado, crear un nuevo carrito
        fetch('/api/carts', {
          method: 'POST'
        })
          .then(response => response.json())
          .then(data => {
            cartId = data.cartId;
            localStorage.setItem('cartId', cartId); // Almacenar cartId en localStorage
          })
          .catch(error => {
            console.error('Error al crear un nuevo carrito:', error);
            return;
          });
    }

    // Agregar producto al carrito
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if (result.status === 1) {
        alert(`Producto agregado al carrito ${cartId} exitosamente!`);
    } else {
        alert('Error al agregar el producto al carrito');
    }
}

addListeners();