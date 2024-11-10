import { Product } from '@/@core/domain/entities/product';
import { ProductGateway } from '@/@core/domain/gateways/product.gateways';


export class ListProductsUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(org: string): Promise<Product[]> {
        // A função findAll já retorna instâncias de Product, então não é necessário mapear novamente
        const products = await this.productGateway.findAll(org);
        return products.map(product => product.toJSON());
    }
}