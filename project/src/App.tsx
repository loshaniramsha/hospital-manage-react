import { Layout, LayoutDashboard, Users, Baby, UserRound, Syringe, Pill as Pills, HeartPulse, Menu, X } from 'lucide-react';
import { useState } from "react";

// Components
import Dashboard from './components/Dashboard';
import DoctorsManage from './components/DoctorsManage';
import StaffManage from './components/StaffManage';
import ChildManage from './components/ChildManage';
import PregnantMothersManage from './components/PregnantMothersManage';
import VaccineManage from './components/VaccineManage';
import MedicineManage from './components/MedicineManage';
import LoginForm from "./components/LoginForm.tsx";

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'doctors', label: 'Doctors', icon: <UserRound className="w-5 h-5" /> },
    { id: 'staff', label: 'Staff', icon: <Users className="w-5 h-5" /> },
    { id: 'children', label: 'Children', icon: <Baby className="w-5 h-5" /> },
    { id: 'mothers', label: 'Pregnant Mothers', icon: <HeartPulse className="w-5 h-5" /> },
    { id: 'vaccines', label: 'Vaccines', icon: <Syringe className="w-5 h-5" /> },
    { id: 'medicine', label: 'Medicine', icon: <Pills className="w-5 h-5" /> },
  ];

  const handleSignIn = () => {
    setIsAuthenticated(true); // Set user as authenticated
  };

  const handleLogOut = () => {
    setIsAuthenticated(false); // Set user as logged out
    setActiveTab('dashboard'); // Reset to dashboard after logging out
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginForm onSignIn={handleSignIn} />; // Show the login form if not authenticated
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'doctors':
        return <DoctorsManage />;
      case 'staff':
        return <StaffManage />;
      case 'children':
        return <ChildManage />;
      case 'mothers':
        return <PregnantMothersManage />;
      case 'vaccines':
        return <VaccineManage />;
      case 'medicine':
        return <MedicineManage />;
      default:
        return <Dashboard />;
    }
  };

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar - Desktop */}
        {isAuthenticated && (
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <Layout className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-800">Clinic Manager</h1>
                </div>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                activeTab === item.id
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      </li>
                  ))}
                  {/* Logout Button */}
                  <li>
                    <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <X className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>
        )}

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Layout className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">Clinic Manager</h1>
            </div>
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && isAuthenticated && (
              <nav className="border-t p-4 bg-white">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                            onClick={() => {
                              setActiveTab(item.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                activeTab === item.id
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      </li>
                  ))}
                  {/* Logout Button */}
                  <li>
                    <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <X className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="md:p-8 p-4 mt-16 md:mt-0">
            {renderContent()}
          </div>
        </main>
      </div>
  );
}

export default App;
