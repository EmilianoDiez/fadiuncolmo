import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LucideIcon, 
  Menu, 
  X, 
  LogOut, 
  Shield, 
  Monitor,
  Users,
  Calendar,
  ScanLine
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useMonitorAuth } from '../hooks/useMonitorAuth';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
  requiresAdmin?: boolean;
  requiresMonitor?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { 
    id: 'home',
    label: 'Inicio', 
    path: '/', 
    icon: Users,
    className: 'font-bold'
  },
  { 
    id: 'register',
    label: 'Registrarse', 
    path: '/register', 
    icon: Users,
    hideWhenAuth: true,
    className: 'font-bold'
  },
  { 
    id: 'reservations',
    label: 'Reservas', 
    path: '/reservations', 
    icon: Calendar,
    requiresAuth: true,
    className: 'font-bold'
  },
  {
    id: 'scanner',
    label: 'Escáner',
    path: '/scanner',
    icon: ScanLine,
    className: 'font-bold'
  },
  { 
    id: 'admin',
    label: 'Admin FADIUNC', 
    path: '/admin', 
    icon: Shield,
    className: 'text-gray-400'
  },
  { 
    id: 'monitor',
    label: 'Monitor Olmo', 
    path: '/monitor', 
    icon: Monitor,
    className: 'text-gray-400'
  }
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const { isAuthenticated: isAdmin } = useAdminAuth();
  const { isAuthenticated: isMonitor } = useMonitorAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredItems = NAV_ITEMS.filter(item => {
    if (isAuthenticated && item.hideWhenAuth) return false;
    if (!isAuthenticated && item.requiresAuth) return false;
    return true;
  });

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const getNavItemStyle = (item: NavItem, isActive: boolean) => {
    const baseClass = "flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors";
    const activeClass = isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600";
    return `${baseClass} ${activeClass} ${item.className || ''}`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1">
            <div className="flex items-center space-x-4">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={getNavItemStyle(item, isActive)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hola, {user?.name}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={getNavItemStyle(item, isActive)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated && (
              <>
                <div className="px-4 py-3 text-gray-700 border-t">
                  Hola, {user?.name}
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;