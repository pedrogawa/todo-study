import "./App.css";
import { Provider } from "react-redux";
import store from "./hooks/store";

import RightContainer from "./components/RightContainer";
import AddTodoModal from "./components/AddTodoModal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RightContainer />
        <AddTodoModal />
      </div>
    </Provider>
  );
}

export default App;
