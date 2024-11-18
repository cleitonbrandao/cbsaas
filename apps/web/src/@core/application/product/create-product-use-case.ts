import { ProductGateway } from '@/@core/domain/gateways/product.gateways';



export class CreateProductUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(org: string, product: any): Promise<void> {
        await this.productGateway.createdByProduct(org!, {product})
    }
}