
const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const productsList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.getElementById('contador-productos');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

productsList.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		const item = e.target.closest('.item');
		const title = item.querySelector('h2').textContent;
		const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));

		const productoExistente = carrito.find(p => p.title === title);

		if (productoExistente) {
			productoExistente.cantidad++;
		} else {
			carrito.push({ title, price, cantidad: 1 });
		}

		actualizarCarrito();
	}
});

function actualizarCarrito() {
	const container = document.querySelector('.container-cart-products');
	container.innerHTML = '';

	let total = 0;
	let totalProductos = 0;

	carrito.forEach(producto => {
		const { title, price, cantidad } = producto;
		total += price * cantidad;
		totalProductos += cantidad;

		const div = document.createElement('div');
		div.classList.add('cart-product');

		div.innerHTML = `
			<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${cantidad}</span>
				<p class="titulo-producto-carrito">${title}</p>
				<span class="precio-producto-carrito">$${price}</span>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none"
				viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="icon-close" data-title="${title}">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12" />
			</svg>
		`;

		container.appendChild(div);
	});

	const totalDiv = document.createElement('div');
	totalDiv.classList.add('cart-total');
	totalDiv.innerHTML = `
		<h3>Total:</h3>
		<span class="total-pagar">$${total}</span>
	`;

	container.appendChild(totalDiv);

	countProducts.textContent = totalProductos;

	// Guardar en localStorage
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const title = e.target.getAttribute('data-title');
		carrito = carrito.filter(producto => producto.title !== title);
		actualizarCarrito();
	}
});

// Render inicial si hay datos en localStorage
if (carrito.length > 0) {
	actualizarCarrito();
}
