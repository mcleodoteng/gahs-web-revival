import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import gahsLogo from "@/assets/gahs-logo.jpeg";

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    children: [
      { name: "About GAHS", href: "/about" },
      { name: "Leadership", href: "/leadership" },
    ]
  },
  { name: "Services", href: "/services" },
  { name: "Institutions", href: "/institutions" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+233322392578" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>+233 (0) 32 239 2578/9</span>
            </a>
            <a href="mailto:ghanaadventisthealthservices@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span>ghanaadventisthealthservices@gmail.com</span>
            </a>
          </div>
          <p className="text-primary-foreground/80 text-xs">
            Compassionate Healthcare Rooted in Faith
          </p>
        </div>
      </div>

      {/* Main navigation */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
      >
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={gahsLogo}
              alt="GAHS Logo"
              className="h-14 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">Ghana Adventist</p>
              <p className="text-sm font-semibold text-primary leading-tight">Health Services</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`nav-link px-4 py-2 rounded-lg flex items-center gap-1 ${
                    isActive(item.href) || item.children?.some(c => isActive(c.href))
                      ? "text-primary bg-primary-light"
                      : "text-muted-foreground hover:text-primary hover:bg-primary-light/50"
                  }`}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 py-2 bg-background rounded-lg shadow-lg border border-border min-w-[180px]"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.href)
                              ? "text-primary bg-primary-light"
                              : "text-muted-foreground hover:text-primary hover:bg-primary-light/50"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth">
              <Button className="gap-2 bg-primary hover:bg-primary-dark">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="container py-4 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-primary bg-primary-light"
                          : "text-muted-foreground hover:text-primary hover:bg-primary-light/50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                              isActive(child.href)
                                ? "text-primary bg-primary-light"
                                : "text-muted-foreground hover:text-primary hover:bg-primary-light/50"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navigation.length * 0.05 }}
                  className="pt-4 border-t border-border mt-4"
                >
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full gap-2 bg-primary hover:bg-primary-dark">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};
