export function whatsAppMessage({
  ownerPhone,
  serviceTitle,
  ownerName,
  message,
}: {
  ownerPhone: string;
  serviceTitle: string;
  ownerName?: string;
  message?: string;
}) {
  const _ownerName = ` ${ownerName}` || "";
  const _message =
    message ||
    `Olá${_ownerName}!+Gostaria+de+informações+sobre+${serviceTitle}`;
  return `https://wa.me/55${ownerPhone}?text=${_message}`;
}
