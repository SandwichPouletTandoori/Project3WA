import React, { useState, useEffect } from 'react';

function Products() {
  const [userRole, setUserRole] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    const userLoggedIn = !!sessionStorage.getItem('isLogged');
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://arthurpiau.ide.3wa.io:9001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

 const handleCreateProduct = async (e) => {
     e.preventDefault();
  
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
   
  
   const requestBody = {
      name: name,
      description: description
    };
  
    try {
      const response = await fetch('http://arthurpiau.ide.3wa.io:9001/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log('Product added successfully !');
        setNewProduct({
          name: "",
          description: ""
        });
        fetchProducts();
      } else {
        console.error("Erreur lors de l'ajout du produit.");
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const handleUpdateProduct = (e, product) => {
    console.log('Product ID:', product)
    console.log(`http://arthurpiau.ide.3wa.io:9001/products/${product.idProduct}`);
    fetch(`http://arthurpiau.ide.3wa.io:9001/products/${product.idProduct}/update`, {
    method: 'POST',
    
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
  })
    .then((res) => {
      if (!res.ok) {
        console.error('Update fail', res);
      }
    })
    .catch((error) => {
      console.error('An error occurred while deleting the product:', error);
    });
  }

  const handleDeleteProduct = (e, productId) => {
    console.log('Product ID:', productId)
    console.log(`http://arthurpiau.ide.3wa.io:9001/products/${productId}`);
  fetch(`http://arthurpiau.ide.3wa.io:9001/products/${productId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.status === 200) {
        e.target.closest('.productItem').remove()
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error('An error occurred while deleting the product:', error);
    });
};

  const updateProduct = (idProduct, updatedData) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex(product => product.idProduct === idProduct);

    if (index !== -1) {
      updatedProducts[index] = {
        ...updatedProducts[index],
        ...updatedData,
      };
      setProducts(updatedProducts);
    }
  };
  return (
    <main className="productMain">
      <h2 className="underline">Explore Our Agro-Products</h2>
      <form className="productCreate" method="post" onSubmit={handleCreateProduct}>
      <label className="italic">Add Product</label>
        <input
          type="text"
          id="name"
          name="name"
        />
       
        <input
          type="text"
          id="description"
          name="description"
        />
        <button type="submit">Add Product</button>
      </form>

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
      <article>
        <ul className="productList">
          {products.map((product, index) => (
            <li key={index} className="productItem">
              <h3 className="productH3">{product.nameProduct}</h3>
              <img className="productPictures" src={product.imageProduct} alt={product.nameProduct} />
              <p className="productDescriptions">{product.descriptionProduct}</p>
              {/* Delete Operation */}
              <button className="displayModify">Modify</button>
              <form className="productUpdate">
                <label className="italic">Modify Product</label>
                  <input
                  type="text"
                  id="inputModifyProductName"
                  name="inutModifyProductName"
                  placeholder="Name"
                  value={product.nameProduct}
                  onChange={(e) => updateProduct(product.idProduct, {nameProduct: e.target.value})}
                  />
                  <input
                  type="text"
                  placeholder="Description"
                  value={product.descriptionProduct}
                  onChange={(e) => updateProduct(product.idProduct, {descriptionProduct: e.target.value})}
                  />
                  <button onClick={(e) => handleUpdateProduct(e, product)}>Update Product</button>
                </form>
              <button onClick={(e) => handleDeleteProduct(e, product.idProduct)}>Delete</button>
            </li>
          ))}
        </ul>
        </article>
      )}
    </main>
  );
}

export default Products