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
    const confirmation = window.confirm("Är du säker att du vill ta bort produkten?");
  if (!confirmation) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      } 

      const response = await fetch(`https://miniwbs-for-react-production.up.railway.app/api/Products/${product.id}`, {
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
      <tr className="hover:bg-gray-50">
        {formErrors.Error && (
          <td colSpan={4} className="border border-gray-300 px-4 py-2 text-red-500">
            {formErrors.Error}
          </td>
        )}
        <td className="border border-gray-300 px-4 py-2 text-left">{product.productName}</td>
        <td className="border border-gray-300 px-4 py-2 text-left">{product.price} kr</td>
        <td className="border border-gray-300 px-4 py-2 text-left">{product.quantity} st</td>
        <td className="border border-gray-300 px-4 py-2 text-left">   
          <button 
            onClick={() => setEditing(true)} 
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition m-2"
          >
            Redigera
          </button>
          <button 
            onClick={deleteProduct} 
            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition m-2"
          >
            Ta bort
          </button>
        </td>
      </tr>
      
      {editing && (
        <tr>
          <td colSpan={4}  className="border border-gray-300 px-4 py-2">
            <ProductForm productToEdit={product} />
            <div className="mt-3 text-center">
              <button 
                onClick={() => setEditing(false)}
                className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Stäng redigerings fönster
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default ProductComponent

