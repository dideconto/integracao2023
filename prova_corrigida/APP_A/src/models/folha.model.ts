export interface Folha {
  id: number;
  funcionario: string;
  cpf: string;
  valor: number;
  horas: number;
  bruto: number;
  liquido: number;
  irrf: number;
  inss: number;
  fgts: number;
  calculado: boolean;
}
