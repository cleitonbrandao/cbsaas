export function formatCurrency(value: number): string {
    const numericValue = value;

    if (isNaN(numericValue)) {
        return 'Valor inválido';
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numericValue);
}
