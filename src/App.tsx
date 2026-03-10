import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import DashboardPage from './dashboard/DashboardPage';
import MakeAppointmentPage from './make-appointment/MakeAppointmentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-blue-600">MyApp</span>
                </div>
                <div className="hidden sm:flex sm:space-x-8">
                  <Link 
                    to="/" 
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/make-appointment" 
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition"
                  >
                    Make Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/make-appointment" element={<MakeAppointmentPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © 2026 MyApp. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
