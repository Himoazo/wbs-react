import { useParams } from "react-router-dom"
import { ProductInterface } from "../Interfaces/ProductInterface"
import { useEffect, useState } from "react"

const SingleProductComponent = () => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const { id } = useParams();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async()=> {
        try {
    
            const response = await fetch(`https://miniwbs-for-react-production.up.railway.app/api/Products/${id}`);
    
            if (!response.ok) { throw Error }
            
            const data = await response.json();
            
            setProduct(data);
    
        } catch (error) {
            console.log(String(error));
        }
    }
    
    

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
          {product ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">{product.productName}</h1>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-green-600">{product.price} kr</span>
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-gray-700">Antal: {product.quantity}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 italic">
              Produkten kunde inte hittas
            </div>
          )}
        </div>
      );
}

export default SingleProductComponent