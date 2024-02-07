import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const stroke: number = 5;
  const cap: any = "round";
  let drawing: boolean = false;
  let ctx: CanvasRenderingContext2D | null = null;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctx = canvas.getContext("2d");
      resizeCanvas(); // Call resizeCanvas initially
      window.addEventListener("resize", resizeCanvas);
      canvas.addEventListener("pointerdown", isDrawing);
      canvas.addEventListener("pointerup", isNotDrawing);
      canvas.addEventListener("pointermove", draw);
    }
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("pointerdown", isDrawing);
        canvas.removeEventListener("pointerup", isNotDrawing);
        canvas.removeEventListener("pointermove", draw);
      }
    };
  }, []);

  function isDrawing() {
    drawing = true;
  }

  function isNotDrawing() {
    drawing = false;
    ctx?.beginPath();
  }

  function draw(event: PointerEvent) {
    const canvas = canvasRef.current;
    if (!drawing || !ctx || !canvas) return;
    ctx.lineWidth = stroke;
    ctx.lineCap = cap;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.margin = "0";
      canvas.style.padding = "0";
      canvas.style.border = "0"; // Ensure no border which might add to the height
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="border-4 border-red-500"
      ></canvas>
    </>
  );
}

export default App;
