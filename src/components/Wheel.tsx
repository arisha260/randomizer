import { useEffect, useRef, useState } from "react";
import { useListStore } from "../stores/listStore";
import { spinWheel } from "../utils/spinWheel";
// import { getWheelSegments } from "../utils/wheelOfFortune";

export function Wheel (){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const list = useListStore((state) => state.listItems);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const size = 350;

  // функция отрисовки колеса
  function drawWheel(ctx: CanvasRenderingContext2D, list: string[], size: number, rotation: number) {

    //! Стартовая отрисовка и позиционирование всего холста
    ctx.clearRect(0, 0, size, size); // очищаем холст

    const radius = size / 2;
    const centerX = size / 2;
    const centerY = size / 2;
    const angleStep = (Math.PI * 2) / list.length;
    const maxTextWidth = radius * 0.5;

    ctx.save();
    ctx.translate(centerX, centerY); // Сместить центр координат в центр круга
    ctx.rotate(rotation);            // Повернуть всю сцену
    ctx.translate(-centerX, -centerY); // Вернуть обратно

    //! Отрисовка фона круга
    ctx.fillStyle = "#646464"; // цвет круга
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); // круг по центру
    ctx.fill();
    ctx.closePath();

    //! Отрисовка секторов (частей) круга
    list.forEach((item, index) => {
      const startAngle = index * angleStep;
      const endAngle = startAngle + angleStep;

      // Цвет для сектора
      ctx.fillStyle = `hsl(${(index * 360) / list.length}, 70%, 50%)`;

      // Рисуем сектор
      ctx.beginPath();
      ctx.moveTo(centerX, centerY); // начинаем с центра
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();


      ctx.save();
      ctx.translate(centerX, centerY);
      const textAngle = startAngle + angleStep / 2;
      ctx.rotate(textAngle);


      // функция подгонки текста под ширину
      function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
        // Если текст уже влезает — сразу возвращаем
        if (ctx.measureText(text).width <= maxWidth) {
          return text;
        }

        let start = 0;
        let end = text.length;
        let trimmed = text;

        while (start < end) {
          const mid = Math.floor((start + end) / 2); // делим пополам
          const candidate = text.slice(0, mid) + "...";

          if (ctx.measureText(candidate).width > maxWidth) {
            // Текст всё ещё широкий → сокращаем
            end = mid - 1;
          } else {
            // Текст помещается → пробуем больше
            trimmed = candidate;
            start = mid + 1;
          }
      }

        return trimmed;
      }


      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textToDraw = fitText(ctx, item, maxTextWidth);
      ctx.fillText(textToDraw, radius * 0.7, 0);

      ctx.restore();
    });

    ctx.restore();

    //! Отрисовка треугольника справа
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(centerX + radius - 10, centerY);
    ctx.lineTo(centerX + radius + 20, centerY - 20);
    ctx.lineTo(centerX + radius + 20, centerY + 20);
    ctx.closePath();
    ctx.fill();

  }


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawWheel(ctx, list, size, rotation);
  }, [list, rotation]);

  const handleSpin = () => {
    spinWheel(setRotation, rotation, setIsSpinning, list.length, { duration: 4000, spins: 6 });
  };

  return (
    <div className="wheel">
      <canvas ref={canvasRef} width={size} height={size} />
      <button className="text btn-r" onClick={handleSpin} disabled={isSpinning}>Крутить</button>
    </div>
  );
}