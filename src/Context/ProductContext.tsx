import { createContext, useState, useContext, ReactNode, useEffect} from "react";
import { ProductInterface, ProductContextInterface } from "../Interfaces/ProductInterface";

const GetProductsContext = createContext<ProductContextInterface | null>(null);

interface ProductProps { children: ReactNode }

export const ProductsProvider: React.FC<ProductProps> = ({children}) => {
    const [products, setProducts] = useState<ProductInterface[] | []>([]);

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
        <GetProductsContext.Provider value={{products, getProducts}}>
            {children}
        </GetProductsContext.Provider>
    )
}

export const useProductContext = () => {
    const context = useContext(GetProductsContext);
    if (!context) throw new Error("useProductContext must be used within ProductProvider");
    return context;
}
