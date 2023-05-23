export class Calculos {
  calcularBruto(horas: number, valor: number): number {
    return horas * valor;
  }

  calcularINSS(bruto: number): number {
    if (bruto <= 1693.72) return bruto * 0.08;
    if (bruto <= 2822.9) return bruto * 0.09;
    if (bruto <= 5645.8) return bruto * 0.11;
    return 621.03;
  }

  calcularIRRF(bruto: number): number {
    if (bruto <= 1903.98) return 0;
    if (bruto <= 2826.65) return bruto * 0.075 - 142.8;
    if (bruto <= 3751.05) return bruto * 0.15 - 354.8;
    if (bruto <= 4664.68) return bruto * 0.225 - 636.13;
    return bruto * 0.275 - 869.36;
  }

  calcularFGTS(bruto: number): number {
    return bruto * 0.08;
  }

  calcularLiquido(bruto: number, inss: number, irrf: number): number {
    return bruto - inss - irrf;
  }
}
