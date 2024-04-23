import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    elements: [],
    boardMouseDownHandler: () => {},
    handleToolItemClic: () => {}
})

export default boardContext