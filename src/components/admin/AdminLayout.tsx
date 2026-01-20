import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  Menu,
  MessageSquare,
  FileCheck,
  X,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import gahsLogo from "@/assets/gahs-logo.jpeg";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, color: "from-blue-500 to-blue-600", badgeKey: null },
  { name: "Pages", href: "/admin/pages", icon: FileText, color: "from-purple-500 to-purple-600", badgeKey: null },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare, color: "from-green-500 to-green-600", badgeKey: "messages" },
  { name: "Application Forms", href: "/admin/form-submissions", icon: FileCheck, color: "from-orange-500 to-orange-600", badgeKey: "forms" },
  { name: "Media", href: "/admin/media", icon: Image, color: "from-pink-500 to-pink-600", badgeKey: null },
  { name: "Settings", href: "/admin/settings", icon: Settings, color: "from-gray-500 to-gray-600", badgeKey: null },
];

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadForms, setUnreadForms] = useState(0);

  // Fetch unread counts
  useEffect(() => {
    const fetchUnreadCounts = async () => {
      // Fetch unread messages count
      const { count: messagesCount } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      
      setUnreadMessages(messagesCount || 0);

      // Fetch form submissions count (treating all as "unread" for now)
      const { count: formsCount } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true });
      
      setUnreadForms(formsCount || 0);
    };

    if (user && isAdmin) {
      fetchUnreadCounts();
    }
  }, [user, isAdmin]);

  const getBadgeCount = (badgeKey: string | null) => {
    if (badgeKey === 'messages') return unreadMessages;
    if (badgeKey === 'forms') return unreadForms;
    return 0;
  };

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-card via-card to-card/95 border-r border-border/50 shadow-2xl transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-5 border-b border-border/50">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <img src={gahsLogo} alt="GAHS" className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <p className="text-lg font-bold text-gold">GAHS</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-gold" />
                    Admin Panel
                  </p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted/80 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
              Menu
            </p>
            {sidebarLinks.map((link, index) => {
              const isActive = location.pathname === link.href || 
                (link.href !== "/admin" && location.pathname.startsWith(link.href));
              const badgeCount = getBadgeCount(link.badgeKey);
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gold text-gold-foreground shadow-lg shadow-gold/25"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-gold-foreground/20" 
                        : `bg-gradient-to-br ${link.color} opacity-80 group-hover:opacity-100`
                    }`}>
                      <link.icon className={`h-4 w-4 ${isActive ? "text-gold-foreground" : "text-white"}`} />
                    </div>
                    <span className="flex-1">{link.name}</span>
                    {badgeCount > 0 && (
                      <span className={`min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold rounded-full ${
                        isActive 
                          ? "bg-gold-foreground/20 text-gold-foreground" 
                          : "bg-destructive text-destructive-foreground"
                      }`}>
                        {badgeCount > 99 ? '99+' : badgeCount}
                      </span>
                    )}
                    {isActive && !badgeCount && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-gold-foreground/60"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border/50 space-y-2 bg-muted/30">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-200">
                <Home className="h-4 w-4 text-white" />
              </div>
              View Site
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 w-full group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-200">
                <LogOut className="h-4 w-4 text-white" />
              </div>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-muted/80 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Admin</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-gold">{title}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.email}
              </span>
              <div className="h-10 w-10 rounded-full bg-gold text-gold-foreground flex items-center justify-center text-sm font-bold shadow-md">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
