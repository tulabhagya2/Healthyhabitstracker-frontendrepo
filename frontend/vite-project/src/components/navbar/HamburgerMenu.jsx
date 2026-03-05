import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

export function HamburgerMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authAPI.logout();
    toast.success('Logged out successfully');
    setIsOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/habits', label: 'Habits' },
    
    
    { to: '/goals', label: 'Goals' },
  ];

  return (
    <>
      {/* Hamburger Icon */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-blue-600 to-indigo-600 text-white shadow-lg z-50 md:hidden">
          <nav className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 hover:bg-blue-500 rounded-md transition-colors text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Logout Button */}
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="mt-4 w-full"
            >
              Logout
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}