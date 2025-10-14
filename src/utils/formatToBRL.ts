export function formatToBRL(value: string | number) {
  const numberValue =
    typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;

  if (isNaN(numberValue) || !isFinite(numberValue)) {
    return value;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
}
