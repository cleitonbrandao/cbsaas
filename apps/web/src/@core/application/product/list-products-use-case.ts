import { Product } from '@/@core/domain/entities/product';
import { ProductGateway } from '@/@core/domain/gateways/product.gateways';
import { ProductHttpGateways } from '@/@core/infra/gateways/product-http.gateways';


export class ListProductsUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(org: string): Promise<Product[]> {
        return await this.productGateway.findAll(org)
    }
}