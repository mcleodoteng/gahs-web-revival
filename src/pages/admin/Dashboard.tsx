import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Eye, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useCMS } from "@/hooks/useCMS";

const pages = [
  { name: "Home", slug: "home", description: "Hero, Director Message, Services preview" },
  { name: "About", slug: "about", description: "Organization history and overview" },
  { name: "Leadership", slug: "leadership", description: "Director and team members" },
  { name: "Services", slug: "services", description: "Core service offerings" },
  { name: "Institutions", slug: "institutions", description: "Healthcare facilities list" },
  { name: "Contact", slug: "contact", description: "Contact information and form" },
];

const AdminDashboard = () => {
  const { content, isLoading } = useCMS();

  const stats = [
    {
      name: "Total Sections",
      value: content.length,
      icon: FileText,
      color: "bg-primary/10 text-primary",
    },
    {
      name: "Active Sections",
      value: content.filter((c) => c.is_active).length,
      icon: Eye,
      color: "bg-green-500/10 text-green-600",
    },
    {
      name: "Pages",
      value: pages.length,
      icon: Edit,
      color: "bg-blue-500/10 text-blue-600",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to GAHS Admin</h1>
          <p className="text-muted-foreground mt-1">
            Manage your website content, pages, and media from here.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-3xl font-bold mt-1">
                      {isLoading ? "-" : stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick access pages */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Access - Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <Link key={page.slug} to={`/admin/pages/${page.slug}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {page.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {page.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs text-muted-foreground">
                      {content.filter((c) => c.page_slug === page.slug).length} sections
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
