import axios from 'axios';

export async function productData(){
    const products = await axios.get("https://api.escuelajs.co/api/v1/products");
    return products;
}