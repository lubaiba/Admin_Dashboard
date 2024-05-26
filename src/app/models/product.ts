export interface Product{
    id:number;
    title:string;
    price:number;
    category:{
        id:number;
        name:string;
        image:string;
    }
    deleteProductId:number;
    description:string;
    images:string;
};