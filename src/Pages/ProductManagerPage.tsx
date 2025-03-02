import { useProductContext } from "../Context/ProductContext"
import ProductForm from "../Components/ProductForm";
import ProductComponent from "../Components/ProductComponent";

const ProductManagerPage = () => {
  const { products } = useProductContext();
    return (
      <>
        <h1 className="text-2xl font-bold mb-4 text-center">Produkt-hanterare</h1>
        <p className="text-center m-3 font-bold">Här kan du lägga till, redigera och ta bort produkter</p>
        
        <ProductForm/>
        
      
      <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Produktnamn</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Pris</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Saldo</th>
              <th className="border border-gray-300 px-4 py-2 text-center">redigera/tabort</th>
            </tr>
          </thead>
              <tbody>
              
        {
           products?.map(product => 
            <ProductComponent key={product.id} product={product}/>
          )
                } 
                </tbody>
        </table>
      </div>
    </div>
      </>
      
    )
}

export default ProductManagerPage

