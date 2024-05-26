import { ServiceBase } from "./service-base";
export class ProductService extends ServiceBase {
  static getProducts = async () => {
    try {
      var productResp = await fetch(this.getUrl("/products"), {
        method: "GET",
      });
      var products = await productResp.json();
      return products;
    } catch (error) {
      console.log("error occured", error);
    }
  };

  static getCategories = async () => {
    try {
      const response = await fetch(this.getUrl("/categories"), {
        method: "GET",
      });
      var categories = await response.json();
      return categories;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  static addNewProduct=async(title:string,price:number,categoryId:number,description:string,images:string[])=>{
    try {
      const response = await fetch(this.getUrl("/products/"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title:title,
          price:price,
          categoryId:categoryId,
          description:description,
          images:images,
        }),
      });
      const data=await response.json();
      return data;
  } catch(error){
      console.error("error adding new product:",error);
  }
  };

  static addNewCategory=async(name:string,image:string)=>{
    try {
      const response = await fetch(this.getUrl("/categories/"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:name,
          image:image,
        }),
      });
      const data=await response.json();
      return data;
  } catch(error){
      console.error("error adding new category:",error);
  }
  };

  static async deleteProduct(productId: number) {
    try {
      const response = await fetch(this.getUrl(`/products/${productId}`), {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  static async deleteCategory(categoryId: number) {
    try {
      const response = await fetch(this.getUrl(`/categories/${categoryId}`), {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  static updateProduct = async (productId: number, title: string, price: number) => {
    try {
       const response = await fetch(this.getUrl(`/products/${productId}`), {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         }, 
         body: JSON.stringify({productId:productId, title:title, price: price }),
       }); 
       return response.ok;
       } catch (error) {
         console.error('Error updating product:', error);
       }
};

static updateCategory = async (categoryId: number, name: string,image:string) => {
  try {
     const response = await fetch(this.getUrl(`/categories/${categoryId}`), {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       }, 
       body: JSON.stringify({ name:name,image:image}),
     }); 
     return response.ok;
     } catch (error) {
       console.error('Error updating product:', error);
     }
};

static userLogin=async(email:string,password:string)=>{
  try{
    const response=await fetch(this.getUrl('/auth/login'),{
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.statusText);
    }
  }  catch (error) {
    console.log("login failed:", error);
  }
}

}
