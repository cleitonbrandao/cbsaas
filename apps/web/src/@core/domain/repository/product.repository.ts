import { Product } from "../entities/product";

export interface ProductRepository{
    createdByProduct(org: string, product: any): Promise<void>;
    findAll(org: string): Promise<Product[]>;
    findById(org: string, id: string): Promise<Product>;
}