import { Product } from "@/@core/domain/entities/product";
import { ProductRepository } from "@/@core/domain/repository/product.repository";
import { api, ApiClient } from '@/@core/infra/http/api-client';
import { string } from 'zod';

export class ProductHttpGateways implements ProductRepository {
    constructor(private http: ApiClient = api) {}

    async createdByProduct(org: string, productData : {name: string, description: string, price: number, price_cost: number}): Promise<void> {
        const {name, description, price, price_cost} = productData
        await this.http.post(`organizations/${org}/products`, {
            json: {
                name,
                description,
                price,
                price_cost
            }
        })
    }

    async findAll(org: string): Promise<Product[]> {
        const response = await this.http.get(`organizations/${org}/products`);
        const data = await response.json<{ products: { id: string, name: string, description: string, price: number, price_cost: number, created_at: string, profit: number }[] }>();
        
        return data.products.map(
            product => new Product({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                price_cost: product.price_cost,
                created_at: product.created_at,
                profit: product.profit
            })
        );
    }

    async findById(org: string, id: string): Promise<Product> {
        return this.http.get<Product>(`organizations/${org}/products/${id}`).json<Product>()
    }
}