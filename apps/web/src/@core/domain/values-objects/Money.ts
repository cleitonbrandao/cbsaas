export class Money {
    constructor(private value: number) {
        if (value < 0) throw new Error(`Value cannot be negative ${value}`)
    }

    get amount(): number {
        return this.value
    }

    toString(): string {
        return this.value.toFixed(2)
    }
}