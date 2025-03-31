export type ProductProps = {
    id: string
    name: string
    description: string
    price: number
    price_cost: number
    created_at: string
    profit: number
}


export class Product {

    constructor(public props: ProductProps) {}
    
    public get product() : ProductProps {
        return {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
            price_cost: this.props.price_cost,
            created_at: this.props.created_at,
            profit: this.props.profit
        }
    }

    public get id() : string {
        return  this.props.id
    }
    
    public get name() : string {
        return this.props.name
    }

    public get description() : string {
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

    public get profit() : number {
        return this.props.price - this.props.price_cost;
    }

    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            price_cost: this.price_cost,
            created_at: this.created_at,
            profit: this.profit
        }
    }
}