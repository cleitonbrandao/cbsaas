import { Container } from "inversify";
import { api } from './http/api-client';
import { ProductHttpGateways } from "./gateways/product-http.gateways";
import { ListProductsUseCase } from "../application/product/list-products-use-case";
import { ProductRepository } from "../domain/repository/product.repository";
import { GetProductUseCase } from '../application/product/get-product-use-case';

export const Registry = {
    KyAdapter: Symbol.for("KyAdapter"),
    ProductGateway: Symbol.for("ProductRepository"),
    ListProductsUseCase: Symbol.for("ListProductsUseCase"),
    GetProductUseCase: Symbol.for("GetProductUseCase")
}

export const container = new Container();

// Registra o adapter ky HTTP
container.bind(Registry.KyAdapter).toConstantValue(api);

// GATEWAYS
container.bind<ProductRepository>(Registry.ProductGateway).to(ProductHttpGateways);

// USECASES
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
    return new ListProductsUseCase(context.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
    return new GetProductUseCase(context.container.get(Registry.ProductGateway))
})
