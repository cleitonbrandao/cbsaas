import { api } from "./api-client";

interface RemoveProductRequest {
    org: string
    productId: string
}
export async function removeProduct({
    org,
    productId
}: RemoveProductRequest) {
    await api.delete(`organizations/${org}/products/${productId}`);
}