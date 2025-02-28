import { useProductContext } from "../Context/ProductContext"

const HomePage = () => {
  const { products } = useProductContext();
  return (
    <>
      <div>HomePage</div>
      {products?.map(p => <div key={p.id}>{p.productName} - {p.price} - {p.quantity} </div>)}
    </>
    
  )
}

export default HomePage
