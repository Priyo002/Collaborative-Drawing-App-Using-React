import React, { useReducer } from 'react'

import boardContext from './board-context'
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from '../constants'
import { createRoughElement } from '../utils/element';


const boardReducer = (state,action) => {
    switch(action.type){
        case BOARD_ACTIONS.CHANGE_TOOL:{
            return {
                ...state,
                activeToolItem: action.payload.tool,
            }
        }
        case BOARD_ACTIONS.DRAW_DOWN: {
            const {clientX,clientY, stroke, fill, size} = action.payload;
            const newElement = createRoughElement(
                state.elements.length,
                clientX,
                clientY,
                clientX,
                clientY,
                {type : state.activeToolItem, stroke,fill, size}
            )
            const prevElements = state.elements;
            return {
                ...state,
                toolActionType: TOOL_ACTION_TYPES.DRAWING,
                elements: [...prevElements,newElement]
            }
        }
        case BOARD_ACTIONS.DRAW_MOVE: {
            const {clientX,clientY} = action.payload;
            const newElements = [...state.elements];
            const index = state.elements.length-1;
            const {x1,y1, stroke,fill , size} = newElements[index];
            const newElement = createRoughElement(
                index,
                x1,
                y1,
                clientX,
                clientY,
                {type : state.activeToolItem, stroke,fill,size},
            );

            newElements[index] = newElement;
            return {
                ...state,
                elements: newElements,
            }
        }
        case BOARD_ACTIONS.DRAW_UP:
            return {
                ...state,
                toolActionType: TOOL_ACTION_TYPES.NONE,
            }
        default:
            return state;
    }
}

const initialBoardState = {
    activeToolItem: TOOL_ITEMS.LINE,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    elements: [],
}

const BoardProvider = ({children}) => {

    const [boardState, dispatchBoardAction] = useReducer(
        boardReducer, 
        initialBoardState
    );

    const changeToolHandler = (tool) => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.CHANGE_TOOL, 
            payload: {
                tool,
            }
        })
    }; 

    const boardMouseDownHandler = (event,toolboxState) => {
        const {clientX, clientY} = event;
    
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_DOWN,
            payload :{
                clientX,
                clientY,
                stroke: toolboxState[boardState.activeToolItem]?.stroke,
                fill: toolboxState[boardState.activeToolItem]?.fill,
                size: toolboxState[boardState.activeToolItem]?.size,
            },
        });
    }

    const boardMouseMoveHandler = (event) => {
        const {clientX, clientY} = event;
    
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_MOVE,
            payload :{
                clientX,
                clientY,
            },
        });
    }

    const boardMouseUpHandler = () => {
    
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_UP,
        });
    }

    const boardContextValue = {
        activeToolItem: boardState.activeToolItem,
        elements: boardState.elements,
        toolActionType: boardState.toolActionType,
        changeToolHandler,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMouseUpHandler,
    };

    return (
        <boardContext.Provider value={boardContextValue}>
            {children}
        </boardContext.Provider>
    )
}

export default BoardProvider