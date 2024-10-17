export function parseCurrency(monetary: string): number {
    if (!monetary) return 0;
    // Remove o "R$" e qualquer ponto de milhar
    const numericValue = monetary.replace("R$", "").replace(/\./g, "").replace(",", ".");
    return parseFloat(numericValue);
}