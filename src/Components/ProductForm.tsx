import {  useEffect, useState } from "react";
import { ProductInterface, FormErros } from "../Interfaces/ProductInterface";
import { useProductContext } from "../Context/ProductContext"

const ProductForm = ({productToEdit} : {productToEdit?: ProductInterface}) => {
    const [addProduct, setCreateProduct] = useState<ProductInterface>({ productName: "", price: 0, quantity: 0 });
    const [formErrors, setFormErrors] = useState<FormErros>({})

    const { getProducts } = useProductContext();
  
  useEffect(() => {
    if (productToEdit != null) {
      setCreateProduct(productToEdit);
    }
  }, [productToEdit]);

     //Validation
  const validateForm = (event: any) => {
    event.preventDefault();
    
    const formValidation: FormErros = {};

    if (!addProduct.productName || addProduct.productName.length < 3 || addProduct.productName.length > 100) {
      formValidation.productName = "Produktnamn måste anges och vara mellan 3 och 50 tecken";
    }

    if (!addProduct.price || addProduct.price < 1 || addProduct.price > 10000) {
        formValidation.price = "Priset måste vara mer än 0 och inte mer än 10 000kr"
    }
      
    if (!addProduct.quantity || addProduct.quantity < 1 || addProduct.quantity > 10000) {
        formValidation.quantity = "Saldot måste vara mer än 0 och inte mer än 10 000st"
    }

    if (Object.keys(formValidation).length > 0) {
      setFormErrors(formValidation);
    } else {
      setFormErrors({});
      createProduct();
    }
  }

    const createProduct = async() => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }
          
          const method = productToEdit != null ? "PUT" : "POST";
          const url = productToEdit != null ? `https://miniwbs-for-react-production.up.railway.app/api/Products/${productToEdit.id}` : "https://miniwbs-for-react-production.up.railway.app/api/Products";
          
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(addProduct)
            });

            if (!response.ok) {
                if (response.status === 500) {
                  throw "Server fel, försök igen senare";
                } else {
                  throw "Ett fel har inträffats, försök igen";
                  }
            }

            getProducts();
            setCreateProduct({ productName: "", price: 0, quantity: 0 });
            setFormErrors({});

        } catch (error: any) {
            setFormErrors({ Error: error || "Ett fel har inträffats"});
        }
    }
  return (
    <form onSubmit={validateForm} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">Produktnamn:</label>
    <input type="text" name="productName" value={addProduct.productName}
      onChange={(event) => setCreateProduct(p => ({ ...p, productName: event.target.value }))}
      className="mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
    />
    {formErrors.productName && <span className="text-sm text-red-500">{formErrors.productName}</span>}
  </div>
  
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">Pris: <small>(Max 10000)</small> </label>
    <input type="number" name="price" value={addProduct.price}
      onChange={(event) => setCreateProduct(p => ({ ...p, price: Number(event.target.value) }))}
      className="mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
    />
    {formErrors.price && <span className="text-sm text-red-500">{formErrors.price}</span>}
  </div>
  
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">Saldo: <small>(Max 10000)</small></label>
    <input type="number" name="quantity" value={addProduct.quantity}
      onChange={(event) => setCreateProduct(p => ({ ...p, quantity: Number(event.target.value) }))}
      className="mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"/>
    {formErrors.quantity && <span className="text-sm text-red-500">{formErrors.quantity}</span>}
  </div>
  
  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" >
    {productToEdit ? "Redigera" : "Lägg till produkt"}
  </button>

  {formErrors.Error && <span className="block text-sm text-red-500 mt-2">{formErrors.Error}</span>}
</form>

  )
}

export default ProductForm