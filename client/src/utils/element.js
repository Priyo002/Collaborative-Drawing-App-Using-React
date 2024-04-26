import { ARROW_LENGTH, TOOL_ITEMS } from "../constants";
import rough from "roughjs/bin/rough"
import { getArrowHeadsCoordinates } from "./math";

const gen = rough.generator();

export const createRoughElement = (id,x1,y1,x2,y2,{type, stroke, fill, size}) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2, 
        type,
        stroke,
        fill,
        size,
    }
    let options = {
        seed: id + 1,//id can't be zero
        fillStyle: "solid",
    };
    if(stroke){
        options.stroke = stroke;
    }
    if(fill){
        options.fill = fill;
    }
    if(size){
        options.strokeWidth = size;
    }
    switch (type) {
        case TOOL_ITEMS.LINE:{
            element.roughEle = gen.line(x1,y1,x2,y2,options);
            return element;
        }
        case TOOL_ITEMS.RECTANGLE:{
            element.roughEle = gen.rectangle(x1,y1,x2-x1,y2-y1,options);
            return element;
        }
        case TOOL_ITEMS.CIRCLE: {
            const cx = (x1+x1)/2, cy = (y1+y2)/2;
            const width = x2-x1, height = y2-y1;
            element.roughEle = gen.ellipse(cx,cy,width,height,options);
            return element;
        }
        case TOOL_ITEMS.ARROW: {
            const {x3,y3,x4,y4} = getArrowHeadsCoordinates(
                x1,
                y1,
                x2,
                y2,
                ARROW_LENGTH
            );
            const points = [
                [x1,y1],
                [x2,y2],
                [x3,y3],
                [x2,y2],
                [x4,y4],
            ]
            element.roughEle = gen.linearPath(points,options);
            return element;
        }
        case TOOL_ITEMS.RESIZE: {
            const cx = (x1+x1)/2, cy = (y1+y2)/2;
            const width = x2-x1, height = y2-y1;
            element.roughEle = gen.ellipse(cx,cy,width,height,options);
            return element;
        }
        default:
            throw new Error("Type not recognized");
    }  
};