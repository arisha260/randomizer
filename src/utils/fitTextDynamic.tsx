export function fitTextDynamic(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxFontSize: number = 16,
  minFontSize: number = 10
): { text: string; fontSize: number } {
  let fontSize = maxFontSize;

  // Пробуем уменьшать шрифт до минимального
  while (fontSize > minFontSize) {
    ctx.font = `${fontSize}px Arial`;
    if (ctx.measureText(text).width <= maxWidth) {
      return { text, fontSize }; // Текст влез, возвращаем
    }
    fontSize--;
  }

  // Если даже на минимальном шрифте текст не влезает → обрезаем
  let start = 0;
  let end = text.length;
  let trimmed = text;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    const candidate = text.slice(0, mid) + "...";

    if (ctx.measureText(candidate).width > maxWidth) {
      end = mid - 1;
    } else {
      trimmed = candidate;
      start = mid + 1;
    }
  }

  return { text: trimmed, fontSize: minFontSize };
}
