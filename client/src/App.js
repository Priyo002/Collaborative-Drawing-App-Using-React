
import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";


function App() {

  return (
    <BoardProvider>
      <ToolboxProvider>
        <ToolBar/>
        <Board/>
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
  )
}

export default App;
