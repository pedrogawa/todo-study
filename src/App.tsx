import "./App.css";
import { Provider } from "react-redux";
import store from "./hooks/store";

import RightContainer from "./components/RightContainer";
import Sidebar from "./components/Sidebar";
import AddTodoModal from "./components/AddTodoModal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <RightContainer />
        <AddTodoModal />
      </div>
    </Provider>
  );
}

export default App;
