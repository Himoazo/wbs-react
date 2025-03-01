import { useProductContext } from "../Context/ProductContext"
import ProductForm from "../Components/ProductForm";
import ProductComponent from "../Components/ProductComponent";

const ProductManagerPage = () => {
  const { products } = useProductContext();
    return (
      <>
        <ProductForm/>
        <div>Product manager</div>
        {
           products?.map(product => 
            <ProductComponent key={product.id} product={product}/>
          )
        }
      </>
      
    )
}

export default ProductManagerPage

