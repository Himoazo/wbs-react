import { ProductInterface } from '../Interfaces/ProductInterface'

const ProductComponent = ({product}: {product: ProductInterface}) => {
  return (
      <>
        <div >
              {product.productName} -
              {product.price} -
              {product.quantity}
              <button>Delete</button>
          </div>
      </>
  )
}

export default ProductComponent

