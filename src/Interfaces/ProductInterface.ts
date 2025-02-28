export interface ProductInterface {
    id: number,            
    productName: string,   
    price: number,
    quantity: number,      
    createdAt: string      
}

export interface ProductContextInterface {
    products: ProductInterface[] | [];
    getProducts: () => Promise<void>;
  }