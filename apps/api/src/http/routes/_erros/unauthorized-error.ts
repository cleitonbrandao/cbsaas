export class UnauthoraziedError extends Error {
    constructor(message?: string) {
        super(message ?? 'Unauthorized.')
    }
}