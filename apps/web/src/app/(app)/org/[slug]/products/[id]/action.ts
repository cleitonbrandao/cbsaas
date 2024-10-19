import { GetProduct } from "http/get-product";
import { BadRequestError } from '../../../../../../../../api/src/http/routes/_erros/bad-request-error';

type GetProductRequest = {
    org: string;
    productId: string;
  };
  
  export default async function GetProductAction({ org, productId }: GetProductRequest) {
    const {product} = await GetProduct({org, productId})
    if (!product) {
      throw new BadRequestError('Product not found.');
    }
    return product;
  }
  