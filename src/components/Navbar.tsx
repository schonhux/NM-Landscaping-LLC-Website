
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleContact = () => {
    if (location.pathname === '/services') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (path === '#about' && location.pathname === '/services') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('#about');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full bg-black shadow-md z-50 transition-transform duration-300 ${
      visible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/3494f5a9-5af0-4d2b-9618-13afc5e9de3e.png" 
                alt="N&M Landscaping LLC" 
                className="h-32 w-auto transition-transform hover:scale-105"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {location.pathname === '/services' ? (
              <Link to="/" className="text-white hover:text-primary transition-colors text-lg">Home</Link>
            ) : (
              <Link to="/services" className="text-white hover:text-primary transition-colors text-lg">Services</Link>
            )}
            <Link to="/reviews" className="text-white hover:text-primary transition-colors text-lg">
              Reviews
            </Link>
            <button 
              onClick={() => handleNavigation('#about')} 
              className="text-white hover:text-primary transition-colors text-lg"
            >
              About
            </button>
            <button 
              onClick={handleContact}
              className="text-white hover:text-primary transition-colors text-lg"
            >
              Contact
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <Menu className="h-8 w-8 text-white" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-6 pb-4">
            {location.pathname === '/services' ? (
              <Link to="/" className="block py-3 text-white hover:text-primary text-lg">Home</Link>
            ) : (
              <Link to="/services" className="block py-3 text-white hover:text-primary text-lg">Services</Link>
            )}
            <Link to="/reviews" className="block py-3 text-white hover:text-primary text-lg">
              Reviews
            </Link>
            <button 
              onClick={() => handleNavigation('#about')} 
              className="block w-full text-left py-3 text-white hover:text-primary text-lg"
            >
              About
            </button>
            <button 
              onClick={handleContact}
              className="block w-full text-left py-3 text-white hover:text-primary text-lg"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
