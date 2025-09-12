export function fitTextDynamic(
  ctx: CanvasRenderingContext2D,
  text: string,
  listLength: number,
  maxFontSize: number = 14,
  minFontSize: number = 12,
  radius?: number // 👈 передаём радиус сектора
): { text: string; fontSize: number } {
  // 📌 Ограничение по количеству символов (чекпоинты)
  let maxChars = 25;
  if (listLength > 50) maxChars = 5;
  else if (listLength > 20) maxChars = 10;

  // 🔠 Размер шрифта в зависимости от списка
  let fontSize = maxFontSize;
  if (listLength > 25) fontSize = 12;
  if (listLength > 40) fontSize = 10;
  if (listLength > 60) fontSize = 8;
  else if (listLength > 80) fontSize = 6;

  fontSize = Math.max(fontSize, minFontSize);
  ctx.font = `${fontSize}px Arial`;

  // Первичная обрезка по символам
  let trimmed = text.length > maxChars ? text.slice(0, maxChars) + "..." : text;

  // Если есть радиус, считаем допустимую ширину текста
  if (radius) {
    const maxWidth = radius * 0.5; // половина радиуса — место под текст

    while (ctx.measureText(trimmed).width > maxWidth && trimmed.length > 3) {
      trimmed = trimmed.slice(0, trimmed.length - 4) + "...";
    }
  }

  return { text: trimmed, fontSize };
}
