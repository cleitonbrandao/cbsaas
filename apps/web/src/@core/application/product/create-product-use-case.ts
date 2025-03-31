import { ProductRepository } from '@/@core/domain/repository/product.repository';



export class CreateProductUseCase {
    constructor(private productGateway: ProductRepository) {}

    async execute(org: string, product: any): Promise<void> {
        await this.productGateway.createdByProduct(org!, {product})
    }
}