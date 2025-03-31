import { ProductProps } from '@/@core/domain/entities/product';
import { ProductRepository } from '@/@core/domain/repository/product.repository';

export class GetProductUseCase {
    constructor(private productGateway: ProductRepository) {}

    async execute(org: string, id: string): Promise<ProductProps> {
        const {product} = await this.productGateway.findById(org, id);
        return product
    }
}