import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
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
    { to: '/activities', label: 'Activities' },
    { to: '/analytics', label: 'Analytics' },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden z-50">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="destructive" onClick={handleLogout} className="mt-4">
              Logout
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
