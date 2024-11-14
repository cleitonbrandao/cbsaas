import { string } from "zod"
import { Product } from "./product"

export type PakcageProps = {
    id: string
    name: string
    description: string
    price: number
    price_cost: number
    created_at: string
    products: Product[]
    // service: Service[]
    // package: PackageService[] | PackageProduct[] | Package[]
}

export class Package {

    constructor(public props: PakcageProps) {}

    public get id(): string {
        return this.props.id
    }

    public get name(): string {
        return this.props.name
    }

    public get description(): string {
        return this.props.description
    }

    public get price() : number {
        return this.props.price
    }

    public get price_cost() : number {
        return this.props.price_cost
    }
     
    public get created_at() : string {
        return this.props.created_at
    }
    

    toJson() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            price_cost: this.price_cost,
            created_at: this.created_at,
            // products: ,
            // services: ,
            // packages: 
        }
    }
}