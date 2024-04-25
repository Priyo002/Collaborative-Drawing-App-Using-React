import { useContext, useEffect,useRef, useLayoutEffect } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import classes from "./index.module.css"

import cx from "classnames"


function Board() {
  const canvasRef = useRef();
  const {
    elements, 
    activeToolItem,
    boardMouseDownHandler, 
    boardMouseMoveHandler, 
    boardMouseUpHandler, 
    toolActionType
  } = useContext(boardContext)

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },[]);

  useLayoutEffect(()=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle)
    });

    return () => {
      context.clearRect(0,0,canvas.width,canvas.height)
    }

  },[elements]);

  const handleMouseDown = (event) => {
    boardMouseDownHandler(event);
  };

  const handleMouseMove = (event) => {
    if(toolActionType===TOOL_ACTION_TYPES.DRAWING)
      boardMouseMoveHandler(event);
  };
  
  const handleMouseUp = () => {
    boardMouseUpHandler();
  };


  return (
    
      <canvas 
        ref={canvasRef} 
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={
          cx({
            [classes.cursor]: toolActionType===TOOL_ACTION_TYPES.DRAWING, 
            [classes.moveCursor]: activeToolItem===TOOL_ITEMS.RESIZE,
          })
        }
      />
  )
}

export default Board;
