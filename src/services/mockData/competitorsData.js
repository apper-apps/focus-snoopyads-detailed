export const generateMockCompetitors = async () => {
  return [
    {
      Id: 1,
      name: "TechFlow Solutions",
      industry: "Technology",
      platforms: ["Facebook", "Google", "LinkedIn"],
      identifiers: {
        facebook: "techflow.solutions",
        google: "techflow.com",
        linkedin: "techflow-solutions"
      },
      addedDate: "2024-01-15T10:30:00Z"
    },
    {
      Id: 2,
      name: "DataSync Pro",
      industry: "Technology",
      platforms: ["Google", "LinkedIn"],
      identifiers: {
        google: "datasyncpro.com",
        linkedin: "datasync-pro"
      },
      addedDate: "2024-01-20T14:45:00Z"
    },
    {
      Id: 3,
      name: "CloudMaster Inc",
      industry: "Technology",
      platforms: ["Facebook", "Google"],
      identifiers: {
        facebook: "cloudmaster.inc",
        google: "cloudmaster.com"
      },
      addedDate: "2024-02-01T09:15:00Z"
    },
    {
      Id: 4,
      name: "SecureVault Systems",
      industry: "Finance",
      platforms: ["LinkedIn", "Google"],
      identifiers: {
        linkedin: "securevault-systems",
        google: "securevault.com"
      },
      addedDate: "2024-02-10T16:20:00Z"
    },
    {
      Id: 5,
      name: "FinanceFlow",
      industry: "Finance",
      platforms: ["Facebook", "LinkedIn"],
      identifiers: {
        facebook: "financeflow.official",
        linkedin: "financeflow"
      },
      addedDate: "2024-02-15T11:30:00Z"
    },
    {
      Id: 6,
      name: "HealthTech Innovations",
      industry: "Healthcare",
      platforms: ["Facebook", "Google", "LinkedIn"],
      identifiers: {
        facebook: "healthtech.innovations",
        google: "healthtechinnovations.com",
        linkedin: "healthtech-innovations"
      },
      addedDate: "2024-02-20T13:45:00Z"
    },
    {
      Id: 7,
      name: "EduSmart Platform",
      industry: "Education",
      platforms: ["Facebook", "Google"],
      identifiers: {
        facebook: "edusmart.platform",
        google: "edusmart.edu"
      },
      addedDate: "2024-02-25T15:10:00Z"
    }
  ]
}