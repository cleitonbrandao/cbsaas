import { ProductProps } from '@/@core/domain/entities/product';
import { ProductGateway } from '@/@core/domain/repository/product.repository';

export class ListProductsUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(org: string): Promise<ProductProps[]> {
        const products = await this.productGateway.findAll(org);
        return products.map(product => product.toJSON());
    }
}