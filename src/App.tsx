import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
          <AppRoutes />
        </main>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
