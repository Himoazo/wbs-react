export interface ProductInterface {
    id?: number,            
    productName: string,   
    price: number,
    quantity: number,      
    createdAt?: string      
}

export interface ProductContextInterface {
    products: ProductInterface[] | [];
    getProducts: () => Promise<void>;
}
  
export interface FormErros {
    id?: string,            
    productName?: string,   
    price?: string,
    quantity?: string,      
    createdAt?: string,
    Error?: string
}