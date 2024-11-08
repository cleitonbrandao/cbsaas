import { Product } from "@/@core/domain/entities/product";
import { ProductGateway } from "@/@core/domain/gateways/product.gateways";
import { api, ApiClient } from '@/@core/infra/http/api-client';

export class ProductHttpGateways implements ProductGateway {
    constructor(private http: ApiClient = api) {}

    async findAll(org: string): Promise<Product[]> {
        const response = await this.http.get(`organizations/${org}/products`);
        console.log(response)
        return response.json<Product[]>();
    }

    async findById(org: string, id: number): Promise<Product> {
        return this.http.get<Product>(`organizations/${org}/products/${id}`).json<Product>()
    }
}