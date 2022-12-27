export interface CartContext {
    openCart:boolean,
    toggleCart:() => void,
    addToCart:(id:string) => void,
    removeToCart:(id:string) => void,
    cart:CartProducts[],
    setProducts:(value:ProductProps[])=>void,
    totalQuantity:()=>number
}

export interface ProductProps {
    image:string,
    name:string,
    description:string,
    category: string,
    price: number,
    _id:string,
}

export interface CartProducts {
    product:ProductProps,
    quantity:number
}

