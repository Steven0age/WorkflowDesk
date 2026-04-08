import "./App.css";
import { Authentication } from "./Authentication";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Authentication />;
    </AppProvider>
  );
}

export default App;
