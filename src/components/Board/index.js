import { useEffect,useRef } from "react";
import rough from "roughjs";

function Board() {
  const canvasRef = useRef();

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //const context = canvas.getContext("2d");

    const roughCanvas = rough.canvas(canvas);
    const generator = roughCanvas.generator;

    let rec1 = generator.rectangle(10,10,100,100);
    roughCanvas.draw(rec1);

    // context.fillStyle = "#FF0000";
    // context.fillRect(0,0,150,75);
  },[])

  return (
    
      <canvas ref={canvasRef}/>
  )
}

export default Board;
