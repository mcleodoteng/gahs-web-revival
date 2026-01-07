import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Building2, Stethoscope, GraduationCap, Pill, MapPin, CheckCircle2, Clock } from "lucide-react";

// Institution data from the provided content
const hospitals = [
  { name: "Akomaa Memorial Hospital", location: "Kortwia", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "Hart Adventist Hospital", location: "Ahinsan", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "Nagel Memorial Adventist Hospital", location: "Takoradi", region: "Western", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Asamang", location: "Agona-Asamang", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Breman", location: "Breman", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Cape Coast", location: "Cape Coast", region: "Central", union: "SGUC", status: "AWAITING FULL ACCREDITATION" },
  { name: "S.D.A. Hospital, Denkyira Dominase", location: "Denkyira Dominase", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Dominase", location: "Dominase", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Gbawe", location: "New Gbawe", region: "Greater Accra", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Koforidua", location: "Koforidua", region: "Eastern", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Kwadaso", location: "Kwadaso", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Namong", location: "Offinso Namong", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Obuasi", location: "Obuasi", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Sefwi Asawinso", location: "Sefwi Asawinso", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Sefwi Kofikrom", location: "Sefwi Kofikrom", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Sunyani", location: "Fiapre - Sunyani", region: "Bono", union: "MCGUM", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Tamale", location: "Tamale", region: "Northern", union: "MCGUM", status: "ACTIVE" },
  { name: "S.D.A. Hospital, Wiamoase", location: "Wiamoase", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "Valley View Hospital, Oyibi", location: "Oyibi", region: "Greater Accra", union: "SGUC", status: "ACTIVE" },
  { name: "Valley View Hospital, Techiman", location: "Techiman", region: "Bono", union: "MCGUM", status: "ACTIVE" },
];

const clinics = [
  { name: "Mary Ekuba Memorial Adventist Clinic", location: "Akwidaa", region: "Western", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Apaah", location: "Apaah", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Anyinasuso", location: "Anyinasuso", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Asaago", location: "Asaago", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Dadieso", location: "Dadieso", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Duadaso No. 2", location: "Duadaaso No. 2", region: "Bono", union: "MCGUM", status: "AWAITING FULL ACCREDITATION" },
  { name: "S.D.A. Clinic, Konkoma", location: "Konkoma", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Kwasi Adukrom", location: "Akwasi Adukrom", region: "Western North", union: "SGUC", status: "AWAITING FULL ACCREDITATION" },
  { name: "S.D.A. Clinic, Nkatieso", location: "Nkatieso", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Sefwi Amoaya", location: "Sefwi Amoaya", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic & Maternity, Sefwi Punikrom", location: "Sefwi Punikrom", region: "Western North", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Wa", location: "Wa", region: "Upper West", union: "MCGUM", status: "ACTIVE" },
  { name: "S.D.A. Clinic, Wassa Nkran", location: "Wassa Nkran", region: "Western", union: "SGUC", status: "ACTIVE" },
  { name: "Adventist Medical Center, Ho", location: "Ho", region: "Volta", union: "SGUC", status: "AWAITING FULL ACCREDITATION" },
];

const polyclinics = [
  { name: "S.D.A. Polyclinic, Nobewam", location: "Nobewam", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Polyclinic, Koforidua", location: "Koforidua", region: "Eastern", union: "SGUC", status: "ACTIVE" },
];

const specializedFacilities = [
  { name: "Central Medical Stores (CMS)", location: "Kwadaso", region: "Ashanti", union: "ALL UNIONS", status: "ACTIVE" },
  { name: "Valley View Dental Clinic", location: "Oduom", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
];

const trainingInstitutions = [
  { name: "Adventist College of Health Sciences", location: "Akyem Batebi", region: "Eastern", union: "SGUC", status: "AWAITING FULL ACCREDITATION" },
  { name: "S.D.A. College of Health, Barekese", location: "Barekese", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. College of Health, Patriensa", location: "Patriensa", region: "Ashanti", union: "MGUC", status: "AWAITING FULL ACCREDITATION" },
  { name: "S.D.A. College of Nursing and Midwifery, Anyinasu", location: "Anyinasu", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Nursing and Midwifery Training College, Asanta", location: "Asanta", region: "Western", union: "SGUC", status: "ACTIVE" },
  { name: "S.D.A. Nursing and Midwifery Training College, Asamang", location: "Asamang", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
  { name: "S.D.A. Nursing and Midwifery Training College, Kwadaso", location: "Kwadaso", region: "Ashanti", union: "MGUC", status: "ACTIVE" },
];

const categories = [
  { id: "all", name: "All Institutions", icon: Building2, count: 43 },
  { id: "hospitals", name: "Hospitals", icon: Building2, count: 20 },
  { id: "clinics", name: "Clinics", icon: Stethoscope, count: 14 },
  { id: "polyclinics", name: "Polyclinics", icon: Stethoscope, count: 2 },
  { id: "specialized", name: "Specialized", icon: Pill, count: 2 },
  { id: "training", name: "Training", icon: GraduationCap, count: 7 },
];

const InstitutionsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getInstitutions = () => {
    let institutions: { name: string; location: string; region: string; union: string; status: string; type: string }[] = [];
    
    switch (activeCategory) {
      case "hospitals":
        institutions = hospitals.map(i => ({ ...i, type: "Hospital" }));
        break;
      case "clinics":
        institutions = clinics.map(i => ({ ...i, type: "Clinic" }));
        break;
      case "polyclinics":
        institutions = polyclinics.map(i => ({ ...i, type: "Polyclinic" }));
        break;
      case "specialized":
        institutions = specializedFacilities.map(i => ({ ...i, type: "Specialized" }));
        break;
      case "training":
        institutions = trainingInstitutions.map(i => ({ ...i, type: "Training" }));
        break;
      default:
        institutions = [
          ...hospitals.map(i => ({ ...i, type: "Hospital" })),
          ...clinics.map(i => ({ ...i, type: "Clinic" })),
          ...polyclinics.map(i => ({ ...i, type: "Polyclinic" })),
          ...specializedFacilities.map(i => ({ ...i, type: "Specialized" })),
          ...trainingInstitutions.map(i => ({ ...i, type: "Training" })),
        ];
    }

    if (searchQuery) {
      institutions = institutions.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return institutions;
  };

  const institutions = getInstitutions();

  return (
    <Layout>
      <PageHero
        title="Our Institutions"
        subtitle="Explore our network of hospitals, clinics, polyclinics, and training institutions across Ghana."
        badge="Institutions Directory"
      />

      {/* Filters Section */}
      <section className="py-8 bg-muted/50 border-b border-border sticky top-[5rem] z-40">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
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

            {/* Search */}
            <div className="w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search by name, location, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
              Showing <span className="font-semibold text-foreground">{institutions.length}</span> institutions
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="institution-table">
              <thead>
                <tr>
                  <th>Institution Name</th>
                  <th>Location</th>
                  <th>Region</th>
                  <th>Union</th>
                  <th>Type</th>
                  <th>Status</th>
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
                <div className="mt-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-light text-secondary">
                    {institution.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InstitutionsPage;
