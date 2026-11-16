/**
 * DATAS SEM FUSO
 *
 * O banco devolve datas puras como "YYYY-MM-DD". `new Date("2026-03-15")`
 * interpreta isso como meia-noite UTC, que no Brasil ainda é dia 14 — a data
 * aparece um dia antes na tela, no contrato e no PDF. Estas funções leem e
 * escrevem a data no fuso de quem está usando.
 */

const SO_DATA = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Converte um valor do banco em Date. Datas puras ("YYYY-MM-DD") viram
 * meia-noite local; instantes com hora ("2026-03-15T18:30:00Z") seguem a
 * conversão normal.
 */
export function parseLocalDate(value: string): Date {
  if (SO_DATA.test(value)) {
    const [ano, mes, dia] = value.split("-").map(Number);
    return new Date(ano, mes - 1, dia);
  }
  return new Date(value);
}

/** Formata um Date como "YYYY-MM-DD" no fuso local (e não em UTC). */
export function toLocalISODate(date: Date): string {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
