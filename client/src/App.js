
import { useEffect, useState } from "react";
import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
      fetch('http://localhost:5001/api/v1/sample/sample')
      .then((res) => res.json())
      .then((response) => setData(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    // <BoardProvider>
    //   <ToolboxProvider>
    //     <ToolBar/>
    //     <Board/>
    //     <Toolbox/>
    //   </ToolboxProvider>
    // </BoardProvider>
    <div>
      {data ? data.message : 'Loading...'}
    </div>
  )
}

export default App;
