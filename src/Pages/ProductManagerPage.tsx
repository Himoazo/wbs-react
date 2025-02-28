import { useProductContext } from "../Context/ProductContext"

const ProductManagerPage = () => {
  const { products } = useProductContext();
    return (
      <>
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