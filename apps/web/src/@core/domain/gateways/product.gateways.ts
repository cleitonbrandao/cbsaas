import { Product } from "../entities/product";

export interface ProductGateway{
    findAll(org: string): Promise<Product[]>;
    findById(org: string, id: number): Promise<Product>;
}