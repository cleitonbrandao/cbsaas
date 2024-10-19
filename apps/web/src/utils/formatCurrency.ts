export function formatCurrency(value: string): string {
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
        return 'Valor inválido';
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numericValue);
}
