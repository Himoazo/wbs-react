import { useProductContext } from "../Context/ProductContext"
import ProductForm from "../Components/ProductForm";
const ProductManagerPage = () => {
  const { products } = useProductContext();
    return (
      <>
        <ProductForm/>
        <div>HomePage</div>
        {
          products?.map(p =>
            <div key={p.id}>
              {p.productName} -
              {p.price} -
              {p.quantity}
              <button>Delete</button>
          </div>
        )}
      </>
      
    )
}

export default ProductManagerPage