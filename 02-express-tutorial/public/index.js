const btnFetch = document.querySelector('#btnFetch');
const productContainer = document.getElementById('productContainer');

const displayProducts = (products) => {
  products.forEach((product) => {
    const { name, image, price, desc } = product;
    const productElement = document.createElement('article');
    productElement.innerHTML = `
        <h2>${name}</h2>
        <img src="${image}" alt="${name}" />
        <h4>${price}</h4>
        <p>${desc}</p>
      `;
    productContainer.appendChild(productElement);
  });
};

const fetchProducts = async () => {
  try {
    const response = await fetch('/api/v1/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    // console.log(data);
    displayProducts(data);
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }
};

btnFetch.addEventListener('click', fetchProducts);
