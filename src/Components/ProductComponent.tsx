import { ProductInterface } from '../Interfaces/ProductInterface'
import { useState } from 'react'
import { FormErros } from '../Interfaces/ProductInterface'
import { useProductContext } from '../Context/ProductContext'
import ProductForm from './ProductForm'

const ProductComponent = ({ product }: { product: ProductInterface }) => {
  const [formErrors, setFormErrors] = useState<FormErros>({})
  const [editing, setEditing] = useState<boolean>(false);

  const { getProducts } = useProductContext();


  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      } 

      const response = await fetch(`http://localhost:5114/api/Products/${product.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw "Produkten att radera har inte hittats";
        } else {
          throw "Det gick inte att ta bort produkten";
        }
      }

      getProducts();
      setFormErrors({});

    } catch (error: any) {
       setFormErrors({ Error: error || "Ett fel har inträffats"});
    } 
  }

  return (
    <>
        {formErrors.Error && <span>{formErrors.Error}</span>}
        <div >
              {product.productName} -
              {product.price} -
              {product.quantity}
              <button onClick={()=> setEditing(true)}>Redigera</button>
              <button onClick={deleteProduct}>Ta bort</button>
        {editing ?
          <div>
            <ProductForm productToEdit={product} />
            <button onClick={()=> setEditing(false)}>Avbryt</button>
          </div>
          : ""}
        </div>
      </>
  )
}

export default ProductComponent

