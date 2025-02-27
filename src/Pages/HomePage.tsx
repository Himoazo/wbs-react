import { useEffect, useState } from "react"
import { Product } from "../Interfaces/Product";

const HomePage = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    getProducts();
  }, []);
  
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5114/api/Products");

      if (!response.ok) { throw Error }
      
      const data = await response.json();
      console.log(data);
      setProducts(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>HomePage</div>
      <div>
        {
          products.map((p) => (
            <div key={p.id}>{p.productName} - { p.price} {p.quantity} </div>
          ))
        }
      </div>
    </>
    
  )
}

export default HomePage