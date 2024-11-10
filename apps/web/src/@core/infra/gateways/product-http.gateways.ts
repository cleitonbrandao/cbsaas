import { Product } from "@/@core/domain/entities/product";
import { ProductGateway } from "@/@core/domain/gateways/product.gateways";
import { api, ApiClient } from '@/@core/infra/http/api-client';

export class ProductHttpGateways implements ProductGateway {
    constructor(private http: ApiClient = api) {}

    async findAll(org: string): Promise<Product[]> {
        const response = await this.http.get(`organizations/${org}/products`);
        const data = await response.json<{ products: { id: string, name: string, description: string, price: number, price_cost: number, created_at: string }[] }>();
        
        return data.products.map(
            product => new Product({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                price_cost: product.price_cost,
                created_at: product.created_at
            })
        );
    }

    async findById(org: string, id: number): Promise<Product> {
        return this.http.get<Product>(`organizations/${org}/products/${id}`).json<Product>()
    }
}