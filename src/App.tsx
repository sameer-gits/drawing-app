import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("draw") as HTMLCanvasElement; // Selecting the canvas element
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx!.lineJoin = "round";
    ctx!.lineCap = "round";
    ctx!.lineWidth = 20;
    ctx!.strokeStyle = "#ac0000";

    function draw(event: PointerEvent) {
      if (!isDrawing || !ctx) return;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      [lastX, lastY] = [event.offsetX, event.offsetY];
    }

    const handlePointerDown = (event: PointerEvent) => {
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
    };

    const handlePointerUp = () => {
      isDrawing = false;
      ctx?.save();
    };
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerout", handlePointerUp);

    // Cleanup event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerout", handlePointerUp);
    };
  }, []);

  return (
    <>
      <canvas id="draw"></canvas>
    </>
  );
}

export default App;
