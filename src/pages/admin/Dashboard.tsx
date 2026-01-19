import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Eye, Edit, MessageSquare, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCMS } from "@/hooks/useCMS";
import { motion } from "framer-motion";

const pages = [
  { name: "Home", slug: "home", description: "Hero, Director Message, Services preview", icon: "🏠" },
  { name: "About", slug: "about", description: "Organization history and overview", icon: "📖" },
  { name: "Leadership", slug: "leadership", description: "Director and team members", icon: "👥" },
  { name: "Services", slug: "services", description: "Core service offerings", icon: "🏥" },
  { name: "Institutions", slug: "institutions", description: "Healthcare facilities list", icon: "🏛️" },
  { name: "Contact", slug: "contact", description: "Contact information and form", icon: "📞" },
];

const AdminDashboard = () => {
  const { content, isLoading } = useCMS();

  const stats = [
    {
      name: "Total Sections",
      value: content.length,
      icon: FileText,
      gradient: "from-primary to-primary-dark",
      bgGradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
    },
    {
      name: "Active Sections",
      value: content.filter((c) => c.is_active).length,
      icon: Eye,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-500/5",
      iconBg: "bg-green-500/20",
    },
    {
      name: "Total Pages",
      value: pages.length,
      icon: Edit,
      gradient: "from-secondary to-blue-600",
      bgGradient: "from-secondary/10 to-blue-500/5",
      iconBg: "bg-secondary/20",
    },
    {
      name: "Media Files",
      value: "—",
      icon: Image,
      gradient: "from-gold to-amber-600",
      bgGradient: "from-gold/10 to-amber-500/5",
      iconBg: "bg-gold/20",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-secondary p-8 text-primary-foreground"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-gold" />
              <span className="text-gold font-medium text-sm uppercase tracking-wider">Admin Panel</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to GAHS Admin</h1>
            <p className="text-primary-foreground/80 max-w-xl">
              Manage your website content, pages, and media from this centralized dashboard.
              Keep your healthcare services information up-to-date and accessible.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.name} variants={item}>
              <Card className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                      <p className="text-4xl font-bold mt-1 bg-gradient-to-r bg-clip-text text-transparent" 
                         style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                        <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          {isLoading ? "—" : stat.value}
                        </span>
                      </p>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.iconBg}`}>
                      <stat.icon className={`h-7 w-7 bg-gradient-to-r ${stat.gradient} bg-clip-text`} 
                                 style={{ color: 'currentColor' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Access Pages */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Quick Access</h2>
              <p className="text-sm text-muted-foreground">Manage your website pages</p>
            </div>
            <Link 
              to="/admin/pages" 
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              View All Pages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {pages.map((page) => (
              <motion.div key={page.slug} variants={item}>
                <Link to={`/admin/pages/${page.slug}`}>
                  <Card className="group h-full border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{page.icon}</span>
                          <div>
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {page.name}
                            </CardTitle>
                            <CardDescription className="text-sm mt-0.5">
                              {page.description}
                            </CardDescription>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-muted-foreground">
                          {content.filter((c) => c.page_slug === page.slug).length} sections
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/messages">
            <Card className="group border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/20">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">Messages</p>
                  <p className="text-sm text-muted-foreground">View contact submissions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/form-submissions">
            <Card className="group border-0 shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary/20">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">Form Submissions</p>
                  <p className="text-sm text-muted-foreground">Review applications</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/media">
            <Card className="group border-0 shadow-lg bg-gradient-to-br from-gold/10 to-gold/5 hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gold/20">
                  <Image className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-gold transition-colors">Media Library</p>
                  <p className="text-sm text-muted-foreground">Manage files & images</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
