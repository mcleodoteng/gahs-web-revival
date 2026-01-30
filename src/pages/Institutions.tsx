import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Building2, Stethoscope, GraduationCap, Pill, MapPin, CheckCircle2, Clock, ChevronUp, ChevronDown, ChevronsUpDown, Filter, X, Phone, Mail, Eye, Building, Users, Globe, Briefcase } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePageContent } from "@/hooks/useCMS";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Institution {
  name: string;
  location: string;
  region: string;
  union: string;
  type: string;
  status: string;
  phone?: string;
  email?: string;
  services?: string[] | string;
  image?: string;
  website?: string;
  conference?: string;
}

// Helper to parse services from CMS (can be string or array)
const parseServices = (services?: string[] | string): string[] => {
  if (!services) return [];
  if (Array.isArray(services)) return services;
  return services.split(',').map(s => s.trim()).filter(Boolean);
};

// Default data as fallback
const defaultHospitals: Institution[] = [
  { name: "Akomaa Memorial Hospital", location: "Kortwia", region: "Ashanti", union: "MGUC", type: "Hospital", status: "ACTIVE" },
  { name: "Hart Adventist Hospital", location: "Ahinsan", region: "Ashanti", union: "MGUC", type: "Hospital", status: "ACTIVE" },
  { name: "Nagel Memorial Adventist Hospital", location: "Takoradi", region: "Western", union: "SGUC", type: "Hospital", status: "ACTIVE" },
];

const defaultClinics: Institution[] = [
  { name: "Mary Ekuba Memorial Adventist Clinic", location: "Akwidaa", region: "Western", union: "SGUC", type: "Clinic", status: "ACTIVE" },
];

const defaultPolyclinics: Institution[] = [
  { name: "S.D.A. Polyclinic, Nobewam", location: "Nobewam", region: "Ashanti", union: "MGUC", type: "Polyclinic", status: "ACTIVE" },
];

const defaultSpecialized: Institution[] = [
  { name: "Central Medical Stores (CMS)", location: "Kwadaso", region: "Ashanti", union: "ALL UNIONS", type: "Specialized", status: "ACTIVE" },
];

const defaultTraining: Institution[] = [
  { name: "S.D.A. College of Health, Barekese", location: "Barekese", region: "Ashanti", union: "MGUC", type: "Training", status: "ACTIVE" },
];

type SortField = "name" | "location" | "region" | "union" | "type" | "status";
type SortDirection = "asc" | "desc";

// Get unique unions/conferences from institutions
const getUniqueUnions = (institutions: Institution[]): string[] => {
  const unions = new Set<string>();
  institutions.forEach(inst => {
    if (inst.union) unions.add(inst.union);
  });
  return Array.from(unions).sort();
};

const InstitutionsPage = () => {
  const { sections, isLoading } = usePageContent("institutions");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedUnion, setSelectedUnion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const isMobile = useIsMobile();
  const itemsPerPage = 10;

  // Get data from CMS or use defaults
  const heroContent = sections.find(s => s.section_key === "hero")?.content as { title?: string; subtitle?: string; badge?: string } | undefined;
  
  const hospitalsContent = sections.find(s => s.section_key === "hospitals")?.content as { institutions?: Institution[] } | undefined;
  const clinicsContent = sections.find(s => s.section_key === "clinics")?.content as { institutions?: Institution[] } | undefined;
  const polyclinicsContent = sections.find(s => s.section_key === "polyclinics")?.content as { institutions?: Institution[] } | undefined;
  const specializedContent = sections.find(s => s.section_key === "specialized")?.content as { institutions?: Institution[] } | undefined;
  const trainingContent = sections.find(s => s.section_key === "training")?.content as { institutions?: Institution[] } | undefined;
  const conferencesContent = sections.find(s => s.section_key === "conferences")?.content as { institutions?: Institution[] } | undefined;

  const hospitals = hospitalsContent?.institutions?.length ? hospitalsContent.institutions : defaultHospitals;
  const clinics = clinicsContent?.institutions?.length ? clinicsContent.institutions : defaultClinics;
  const polyclinics = polyclinicsContent?.institutions?.length ? polyclinicsContent.institutions : defaultPolyclinics;
  const specialized = specializedContent?.institutions?.length ? specializedContent.institutions : defaultSpecialized;
  const training = trainingContent?.institutions?.length ? trainingContent.institutions : defaultTraining;
  const conferences = conferencesContent?.institutions?.length ? conferencesContent.institutions : [];

  // Combine all institutions for union filtering
  const allInstitutionsList = useMemo(() => [
    ...hospitals,
    ...clinics,
    ...polyclinics,
    ...specialized,
    ...training,
    ...conferences,
  ], [hospitals, clinics, polyclinics, specialized, training, conferences]);

  const uniqueUnions = useMemo(() => getUniqueUnions(allInstitutionsList), [allInstitutionsList]);

  const categories = useMemo(() => [
    { id: "all", name: "All Institutions", icon: Building2, count: hospitals.length + clinics.length + polyclinics.length + specialized.length + training.length + conferences.length },
    { id: "hospitals", name: "Hospitals", icon: Building2, count: hospitals.length },
    { id: "clinics", name: "Clinics", icon: Stethoscope, count: clinics.length },
    { id: "polyclinics", name: "Polyclinics", icon: Stethoscope, count: polyclinics.length },
    { id: "specialized", name: "Specialized", icon: Pill, count: specialized.length },
    { id: "training", name: "Training", icon: GraduationCap, count: training.length },
    { id: "conferences", name: "Conferences", icon: Briefcase, count: conferences.length },
  ], [hospitals, clinics, polyclinics, specialized, training, conferences]);

  const getInstitutions = () => {
    let institutions: Institution[] = [];
    
    switch (activeCategory) {
      case "hospitals":
        institutions = hospitals;
        break;
      case "clinics":
        institutions = clinics;
        break;
      case "polyclinics":
        institutions = polyclinics;
        break;
      case "specialized":
        institutions = specialized;
        break;
      case "training":
        institutions = training;
        break;
      case "conferences":
        institutions = conferences;
        break;
      default:
        institutions = [
          ...hospitals,
          ...clinics,
          ...polyclinics,
          ...specialized,
          ...training,
          ...conferences,
        ];
    }

    // Filter by union/conference
    if (selectedUnion !== "all") {
      institutions = institutions.filter(i => i.union === selectedUnion);
    }

    if (searchQuery) {
      institutions = institutions.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort institutions
    institutions.sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return institutions;
  };

  const allInstitutions = getInstitutions();
  const totalPages = Math.ceil(allInstitutions.length / itemsPerPage);
  const institutions = allInstitutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-primary" />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary" />
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title={heroContent?.title || "Our Institutions"}
        subtitle={heroContent?.subtitle || "Explore our network of hospitals, clinics, polyclinics, and training institutions across Ghana."}
        badge={heroContent?.badge || "Institutions Directory"}
      />

      {/* Filters Section */}
      <section className="py-3 md:py-6 bg-muted/50 border-b border-border sticky top-[4.5rem] md:top-[7.5rem] z-40">
        <div className="container">
          {/* Mobile: Compact filter bar */}
          <div className="lg:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium"
              >
                <Filter className="h-4 w-4" />
                {activeCategory === "all" ? "All" : categories.find(c => c.id === activeCategory)?.name}
                <span className="text-xs text-muted-foreground">({allInstitutions.length})</span>
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            
            {/* Mobile: Expandable filter panel */}
            {mobileFiltersOpen && (
              <div className="mt-3 p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Filter by category</span>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setMobileFiltersOpen(false);
                      }}
                      className={`filter-pill flex items-center gap-1.5 text-xs py-1.5 px-2.5 ${
                        activeCategory === category.id ? "active" : ""
                      }`}
                    >
                      <category.icon className="h-3 w-3" />
                      {category.name}
                      <span className="opacity-70">({category.count})</span>
                    </button>
                  ))}
                </div>
                
                {/* Conference/Union Filter for Mobile */}
                <div className="pt-3 border-t border-border">
                  <span className="text-sm font-medium text-foreground block mb-2">Filter by Conference</span>
                  <select
                    value={selectedUnion}
                    onChange={(e) => {
                      setSelectedUnion(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="all">All Conferences</option>
                    {uniqueUnions.map((union) => (
                      <option key={union} value={union}>{union}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop: Full filter bar */}
          <div className="hidden lg:flex flex-row gap-4 items-center justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`filter-pill flex items-center gap-2 ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                  <span className="text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Conference/Union Filter */}
              <select
                value={selectedUnion}
                onChange={(e) => {
                  setSelectedUnion(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="all">All Conferences</option>
                {uniqueUnions.map((union) => (
                  <option key={union} value={union}>{union}</option>
                ))}
              </select>

              {/* Search */}
              <input
                type="text"
                placeholder="Search by name, location, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Institutions Table */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{institutions.length}</span> of{" "}
              <span className="font-semibold text-foreground">{allInstitutions.length}</span> institutions
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="institution-table">
              <thead>
                <tr>
                  <th 
                    onClick={() => handleSort("name")}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Institution Name
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("location")}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Location
                      {getSortIcon("location")}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("region")}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Region
                      {getSortIcon("region")}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("union")}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Union
                      {getSortIcon("union")}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("type")}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Type
                      {getSortIcon("type")}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("status")}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Status
                      {getSortIcon("status")}
                    </div>
                  </th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map((institution, index) => (
                  <tr key={index}>
                    <td className="font-medium text-foreground">{institution.name}</td>
                    <td>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {institution.location}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{institution.region}</td>
                    <td className="text-muted-foreground">{institution.union}</td>
                    <td>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-light text-secondary">
                        {institution.type}
                      </span>
                    </td>
                    <td>
                      {institution.status === "ACTIVE" ? (
                        <span className="status-active">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Active
                        </span>
                      ) : (
                        <span className="status-pending">
                          <Clock className="h-3.5 w-3.5" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => setSelectedInstitution(institution)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-dark bg-primary-light hover:bg-primary-light/80 rounded-lg transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {institutions.map((institution, index) => (
              <div key={index} className="bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">{institution.name}</h3>
                  {institution.status === "ACTIVE" ? (
                    <span className="status-active">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </span>
                  ) : (
                    <span className="status-pending">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {institution.location}, {institution.region}
                  </p>
                  <p>Union: {institution.union}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-light text-secondary">
                    {institution.type}
                  </span>
                  <button
                    onClick={() => setSelectedInstitution(institution)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-dark bg-primary-light hover:bg-primary-light/80 rounded-lg transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first, last, current, and adjacent pages
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (page === 2 && currentPage > 3) ||
                      (page === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <span className="px-2">...</span>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* Institution Details Modal */}
      <Dialog open={!!selectedInstitution} onOpenChange={() => setSelectedInstitution(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selectedInstitution?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedInstitution && (
            <div className="space-y-6">
              {/* Facility Image Placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {selectedInstitution.image ? (
                  <img 
                    src={selectedInstitution.image} 
                    alt={selectedInstitution.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Building className="h-12 w-12" />
                    <span className="text-sm">Facility Image</span>
                  </div>
                )}
              </div>

              {/* Status and Type */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary-light text-secondary">
                  {selectedInstitution.type}
                </span>
                {selectedInstitution.status === "ACTIVE" ? (
                  <span className="status-active">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active
                  </span>
                ) : (
                  <span className="status-pending">
                    <Clock className="h-3.5 w-3.5" />
                    Pending
                  </span>
                )}
              </div>

              {/* Location Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </h4>
                <div className="pl-6 space-y-1 text-sm text-muted-foreground">
                  <p>{selectedInstitution.location}</p>
                  <p>{selectedInstitution.region} Region</p>
                  <p>Union: {selectedInstitution.union}</p>
                  {selectedInstitution.conference && (
                    <p className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-primary" />
                      Conference: {selectedInstitution.conference}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Contact Information
                </h4>
                <div className="pl-6 space-y-2 text-sm">
                  {selectedInstitution.phone ? (
                    <a href={`tel:${selectedInstitution.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-3.5 w-3.5" />
                      {selectedInstitution.phone}
                    </a>
                  ) : (
                    <p className="flex items-center gap-2 text-muted-foreground/60">
                      <Phone className="h-3.5 w-3.5" />
                      Contact information not available
                    </p>
                  )}
                  {selectedInstitution.email ? (
                    <a href={`mailto:${selectedInstitution.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-3.5 w-3.5" />
                      {selectedInstitution.email}
                    </a>
                  ) : (
                    <p className="flex items-center gap-2 text-muted-foreground/60">
                      <Mail className="h-3.5 w-3.5" />
                      Email not available
                    </p>
                  )}
                  {selectedInstitution.website ? (
                    <a 
                      href={selectedInstitution.website.startsWith("http") ? selectedInstitution.website : `https://${selectedInstitution.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      {selectedInstitution.website.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <p className="flex items-center gap-2 text-muted-foreground/60">
                      <Globe className="h-3.5 w-3.5" />
                      Website not available
                    </p>
                  )}
                </div>
              </div>

              {/* Services Offered */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  Services Offered
                </h4>
                <div className="pl-6">
                  {(() => {
                    const servicesList = parseServices(selectedInstitution.services);
                    return servicesList.length > 0 ? (
                      <ul className="grid grid-cols-2 gap-2">
                        {servicesList.map((service, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-primary" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground/60">
                        General healthcare services - Contact facility for details
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InstitutionsPage;
