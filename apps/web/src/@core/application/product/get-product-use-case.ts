import { ProductProps } from '@/@core/domain/entities/product';
import { ProductGateway } from '@/@core/domain/gateways/product.gateways';

export class GetProductUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(org: string, id: string): Promise<ProductProps> {
        const {product} = await this.productGateway.findById(org, id);
        return product
    }
}