import { Container } from "inversify";
import { api } from './http/api-client';
import { ProductHttpGateways } from "./gateways/product-http.gateways";
import { ListProductsUseCase } from "../application/product/list-products-use-case";
import { ProductGateway } from "../domain/gateways/product.gateways";

export const Registry = {
    KyAdapter: Symbol.for("KyAdapter"),
    ProductGateway: Symbol.for("ProductGateway"),
    ListProductsUseCase: Symbol.for("ListProductsUseCase")
}

export const container = new Container();

// Registra o adapter ky
container.bind(Registry.KyAdapter).toConstantValue(api);

// Registra a implementação de ProductGateway (ProductHttpGateways)
container.bind<ProductGateway>(Registry.ProductGateway).to(ProductHttpGateways);

// Registra o ListProductsUseCase, que depende do ProductGateway
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
    return new ListProductsUseCase(context.container.get(Registry.ProductGateway));
});
