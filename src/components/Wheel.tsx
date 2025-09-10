import { useEffect, useRef, useState } from "react";
import { useListStore } from "../stores/listStore";
import { spinWheel } from "../utils/spinWheel";
import { fitTextDynamic } from "../utils/fitTextDynamic";
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

    ctx.save();
    ctx.translate(centerX, centerY); // Сместить центр координат в центр круга
    ctx.rotate(rotation);            // Повернуть всю сцену
    ctx.translate(-centerX, -centerY); // Вернуть обратно

    //! Отрисовка фона круга
    ctx.fillStyle = "#191919"; // цвет круга
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); // круг по центру
    ctx.fill();
    ctx.closePath();

    //! Отрисовка секторов (частей) круга
    list.forEach((item, index) => {
      const startAngle = index * angleStep;
      const endAngle = startAngle + angleStep;

      // Цвет для сектора
      ctx.fillStyle = `#191919`;

      // Рисуем сектор
      ctx.beginPath();
      ctx.moveTo(centerX, centerY); // начинаем с центра
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#242424";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();

      ctx.translate(centerX, centerY);
      const midAngle = startAngle + angleStep / 2;
      ctx.rotate(midAngle);

      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Вычисляем максимальный размер шрифта для сектора
      const arcLength = radius * angleStep;
      const maxWidth = arcLength * 0.8; // текст чуть меньше длины дуги
      const maxFontSize = 20; // базовый верхний предел

      // Получаем текст и размер шрифта
      const { text: finalText, fontSize } = fitTextDynamic(ctx, item, maxWidth, maxFontSize);
      ctx.font = `${fontSize}px Arial`;

      // Рисуем текст
      ctx.fillText(finalText, radius * 0.7, 0);

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
    spinWheel(setRotation, rotation, setIsSpinning, list.length);
  };

  return (
    <div className="wheel">
      <canvas ref={canvasRef} width={size + 5} height={size + 5} />
      <button className="text btn-r" onClick={handleSpin} disabled={isSpinning}>Крутить</button>
    </div>
  );
}