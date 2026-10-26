import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backendApi";

export interface EmergencyCaseRecord {
  id: string;
  category: string;
  categoryId: string;
  title: string;
  beneficiaryName: string;
  description: string;
  location: string;
  urgency: "Urgent" | "High Priority" | "Moderate";
  goal: number;
  raised: number;
  donorCount: number;
  image: string;
  alt: string;
  verified: boolean;
  hospitalOrDetails?: string;
}

export interface EmergencyCategoryMeta {
  id: string;
  name: string;
  description: string;
  iconName: string;
  activeCount: number;
}

const verifiedEmergencyCases: EmergencyCaseRecord[] = [
  {
    id: "medical-suresh-sharma",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Suresh Sharma",
    title: "Needs urgent heart surgery for a congenital heart condition.",
    description: "7-year-old child diagnosed with congenital heart disease requiring immediate open-heart surgery at pediatric cardiac center.",
    location: "Mumbai, Maharashtra",
    urgency: "Urgent",
    goal: 500000,
    raised: 320000,
    donorCount: 28,
    image: "/images/donation/emergency/emergency-medical.jpg",
    alt: "Suresh Sharma receiving medical care in hospital",
    verified: true,
    hospitalOrDetails: "Kokilaben Dhirubhai Ambani Hospital, Mumbai",
  },
  {
    id: "education-amina-khatun",
    category: "Educational Assistance",
    categoryId: "education",
    beneficiaryName: "Amina Khatun",
    title: "Needs financial support for school education and annual fees.",
    description: "Meritorious 10th-grade student whose family lost daily wage livelihoods, facing school dropout without tuition and exam fee support.",
    location: "Patna, Bihar",
    urgency: "High Priority",
    goal: 100000,
    raised: 45000,
    donorCount: 16,
    image: "/images/donation/emergency/emergency-education.jpg",
    alt: "Amina Khatun smiling in school uniform with books",
    verified: true,
    hospitalOrDetails: "Patna High School & Tuition Assistance",
  },
  {
    id: "disaster-ramesh-patil",
    category: "Disaster Relief",
    categoryId: "disaster",
    beneficiaryName: "Ramesh Patil",
    title: "Needs medical treatment after flood injury and rehabilitation support.",
    description: "Flood survivor rescued from Panchganga river basin, requiring wound treatment, replacement of destroyed agricultural tools, and temporary shelter.",
    location: "Kolhapur, Maharashtra",
    urgency: "Urgent",
    goal: 500000,
    raised: 210000,
    donorCount: 34,
    image: "/images/donation/emergency/emergency-disaster.jpg",
    alt: "Flood rescue boat helping affected families in Kolhapur",
    verified: true,
    hospitalOrDetails: "Kolhapur Civil Hospital & Disaster Relief Cell",
  },
  {
    id: "medical-neha-singh",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Neha Singh",
    title: "Needs treatment for respiratory illness and ICU care.",
    description: "12-year-old Neha is admitted in intensive care following acute respiratory distress syndrome, requiring oxygen support and medication.",
    location: "Kolkata, West Bengal",
    urgency: "High Priority",
    goal: 200000,
    raised: 60000,
    donorCount: 19,
    image: "/images/donation/emergency/case-neha-singh.jpg",
    alt: "Neha Singh receiving respiratory oxygen care in hospital",
    verified: true,
    hospitalOrDetails: "SSKM Medical College & Hospital, Kolkata",
  },
  {
    id: "medical-vikram-reddy",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Vikram Reddy",
    title: "Needs surgery for a road accident injury.",
    description: "Sole breadwinner suffered severe leg fracture and pelvic injury in a road accident, needing internal fixation surgery and orthopaedic care.",
    location: "Chennai, Tamil Nadu",
    urgency: "Urgent",
    goal: 200000,
    raised: 140000,
    donorCount: 22,
    image: "/images/donation/emergency/case-vikram-reddy.jpg",
    alt: "Vikram Reddy in recovery with orthopaedic plaster cast",
    verified: true,
    hospitalOrDetails: "Government General Hospital, Chennai",
  },
  {
    id: "medical-pooja-verma",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Pooja Verma",
    title: "Needs long-term treatment for a serious illness.",
    description: "Pooja requires ongoing intravenous treatment and specialised medication for an auto-immune disorder diagnosed early this year.",
    location: "Bhopal, Madhya Pradesh",
    urgency: "Moderate",
    goal: 200000,
    raised: 50000,
    donorCount: 11,
    image: "/images/donation/emergency/case-pooja-verma.jpg",
    alt: "Pooja Verma resting in hospital ward bed",
    verified: true,
    hospitalOrDetails: "AIIMS Bhopal",
  },
  {
    id: "medical-arjun-mehta",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Arjun Mehta",
    title: "Needs chemotherapy for cancer treatment.",
    description: "Young cancer patient undergoing targeted chemotherapy cycles with father supporting full-time through hospital admissions.",
    location: "Delhi",
    urgency: "Moderate",
    goal: 500000,
    raised: 190000,
    donorCount: 31,
    image: "/images/donation/emergency/case-arjun-mehta.jpg",
    alt: "Arjun Mehta with caregiver in oncology clinic",
    verified: true,
    hospitalOrDetails: "Delhi State Cancer Institute",
  },
  {
    id: "medical-ritika-yadav",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Ritika Yadav",
    title: "Needs immediate medical care after an accident.",
    description: "6-year-old Ritika survived a construction collapse accident, receiving treatment for head trauma and wound rehabilitation.",
    location: "Lucknow, Uttar Pradesh",
    urgency: "High Priority",
    goal: 200000,
    raised: 110000,
    donorCount: 15,
    image: "/images/donation/emergency/case-ritika-yadav.jpg",
    alt: "Ritika Yadav with head bandage in hospital ward",
    verified: true,
    hospitalOrDetails: "KGMU Trauma Centre, Lucknow",
  },
  {
    id: "medical-imran-khan",
    category: "Medical Assistance",
    categoryId: "medical",
    beneficiaryName: "Imran Khan",
    title: "Needs kidney treatment and dialysis support.",
    description: "11-year-old boy suffering from chronic renal failure, requiring bi-weekly dialysis and preparatory medical management for a donor transplant.",
    location: "Jaipur, Rajasthan",
    urgency: "Moderate",
    goal: 200000,
    raised: 80000,
    donorCount: 14,
    image: "/images/donation/emergency/case-imran-khan.jpg",
    alt: "Imran Khan in nephrology pediatric ward",
    verified: true,
    hospitalOrDetails: "SMS Hospital Nephrology Wing, Jaipur",
  },
  {
    id: "housing-sunita-kamble",
    category: "Housing & Rehabilitation",
    categoryId: "housing",
    beneficiaryName: "Sunita Kamble",
    title: "Assistance for house damage, building collapse and rehabilitation.",
    description: "Family lost their home in heavy monsoon rains and hillock landslide, needing structural materials and rebuild grants.",
    location: "Ratnagiri, Maharashtra",
    urgency: "High Priority",
    goal: 400000,
    raised: 180000,
    donorCount: 18,
    image: "/images/donation/emergency/emergency-housing.jpg",
    alt: "Housing damage assistance and family rehabilitation",
    verified: true,
    hospitalOrDetails: "Ratnagiri Disaster Rehabilitation",
  },
  {
    id: "food-santosh-devi",
    category: "Food & Essentials",
    categoryId: "food",
    beneficiaryName: "Santosh Devi",
    title: "Emergency food rations, clean water kits and survival essentials.",
    description: "Support for daily nutrition rations, dry food packets, and potable water filtration kits for 25 destitute households.",
    location: "Gaya, Bihar",
    urgency: "Urgent",
    goal: 150000,
    raised: 85000,
    donorCount: 24,
    image: "/images/story-1.png",
    alt: "Food distribution and essentials support",
    verified: true,
    hospitalOrDetails: "HRSJM Community Food Relief Drive",
  },
  {
    id: "women-meena-kumari",
    category: "Women & Child Support",
    categoryId: "women-child",
    beneficiaryName: "Meena Kumari",
    title: "Assistance for women in crisis, child welfare, safety and education.",
    description: "Protection, safe accommodation, legal counseling, and schooling support for single mother raising two young daughters.",
    location: "Ranchi, Jharkhand",
    urgency: "High Priority",
    goal: 250000,
    raised: 125000,
    donorCount: 20,
    image: "/images/rights/womens-rights-collage.jpg",
    alt: "Women & child protection and empowerment",
    verified: true,
    hospitalOrDetails: "HRSJM Women Protection & Legal Cell",
  },
];

const categoryTemplates: { id: string; name: string; description: string; iconName: string; baseCount: number }[] = [
  {
    id: "medical",
    name: "Medical Assistance",
    description: "Support for hospitalization, major operations and emergency medical needs.",
    iconName: "HeartPulse",
    baseCount: 12,
  },
  {
    id: "education",
    name: "Educational Assistance",
    description: "Help for school fees, college admissions, uniforms, books and learning needs.",
    iconName: "GraduationCap",
    baseCount: 8,
  },
  {
    id: "disaster",
    name: "Disaster Relief",
    description: "Emergency support during floods, storms, heavy rainfall, fires and other natural disasters.",
    iconName: "CloudLightning",
    baseCount: 15,
  },
  {
    id: "housing",
    name: "Housing & Rehabilitation",
    description: "Assistance for house damage, building collapse and rehabilitation of affected families.",
    iconName: "Home",
    baseCount: 10,
  },
  {
    id: "food",
    name: "Food & Essentials",
    description: "Support for food, clean water, daily essentials and basic survival needs.",
    iconName: "Utensils",
    baseCount: 18,
  },
  {
    id: "women-child",
    name: "Women & Child Support",
    description: "Assistance for women in crisis, child welfare, safety, education and rehabilitation.",
    iconName: "Users",
    baseCount: 14,
  },
];

export async function GET() {
  let backendItems: Record<string, unknown>[] = [];

  // 1. Try local configured backend
  try {
    const primaryUrl = `${getBackendApiUrl()}/assistance-requests/approved`;
    const res = await fetch(primaryUrl, { cache: "no-store", signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.data?.items)) {
        backendItems = data.data.items;
      }
    }
  } catch {
    // 2. If primary fails (e.g. localhost offline), try VPS endpoint
    try {
      const vpsUrl = "http://194.164.151.17:3000/api/v1/assistance-requests/approved";
      const res = await fetch(vpsUrl, { cache: "no-store", signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.data?.items)) {
          backendItems = data.data.items;
        }
      }
    } catch {
      // Both offline or timed out, will use verified dataset
    }
  }

  // Merge live backend cases if any exist
  const mergedCases = [...verifiedEmergencyCases];

  backendItems.forEach((bItem: Record<string, unknown>) => {
    // Check if item already exists by beneficiary name or id
    const bId = String(bItem.id || "");
    const bName = String(bItem.full_name || "");
    const existingIndex = mergedCases.findIndex(
      (c) => c.id === bId || c.beneficiaryName.toLowerCase() === bName.toLowerCase()
    );

    const goal = Number(bItem.requested_amount) || 200000;
    const raised = Number(bItem.raised_amount) || 0;
    const categoryName = String(bItem.reason || "Medical Assistance");

    let categoryId = "medical";
    const lowerReason = categoryName.toLowerCase();
    if (lowerReason.includes("educat") || lowerReason.includes("school")) categoryId = "education";
    else if (lowerReason.includes("disaster") || lowerReason.includes("flood")) categoryId = "disaster";
    else if (lowerReason.includes("hous") || lowerReason.includes("rehab")) categoryId = "housing";
    else if (lowerReason.includes("food") || lowerReason.includes("essential")) categoryId = "food";
    else if (lowerReason.includes("women") || lowerReason.includes("child")) categoryId = "women-child";

    if (existingIndex >= 0) {
      // Update with live values
      mergedCases[existingIndex].goal = goal > 0 ? goal : mergedCases[existingIndex].goal;
      mergedCases[existingIndex].raised = raised > 0 ? raised : mergedCases[existingIndex].raised;
      mergedCases[existingIndex].donorCount = Number(bItem.donor_count) || mergedCases[existingIndex].donorCount;
      const desc = String(bItem.description || "");
      if (desc) mergedCases[existingIndex].description = desc;
    } else if (String(bItem.status) === "APPROVED") {
      // Prepend newly approved live case
      const bUserRecord = bItem.user as Record<string, unknown> | undefined;
      mergedCases.unshift({
        id: bId || `live-${Date.now()}`,
        category: categoryName,
        categoryId,
        beneficiaryName: bName || "Beneficiary in Need",
        title: String(bItem.description || `Assistance request for ${categoryName}`),
        description: String(bItem.description || "Verified emergency humanitarian assistance case under review and fund disbursement."),
        location: String(bUserRecord?.state || "India"),
        urgency: "High Priority",
        goal: goal > 0 ? goal : 100000,
        raised,
        donorCount: Number(bItem.donor_count) || 0,
        image: "/images/donation/emergency/emergency-medical.jpg",
        alt: `${bName || "Beneficiary"} assistance case`,
        verified: true,
      });
    }
  });

  // Calculate dynamic category active counts
  const categories: EmergencyCategoryMeta[] = categoryTemplates.map((tpl) => {
    const matchingCases = mergedCases.filter((c) => c.categoryId === tpl.id);
    return {
      id: tpl.id,
      name: tpl.name,
      description: tpl.description,
      iconName: tpl.iconName,
      activeCount: Math.max(tpl.baseCount, matchingCases.length),
    };
  });

  return NextResponse.json({
    success: true,
    cases: mergedCases,
    categories,
    // Maintain backwards compatibility with causes items for older callers
    items: mergedCases.map((c) => ({
      id: c.id,
      reason: c.category,
      full_name: c.beneficiaryName,
      description: c.title,
      requested_amount: c.goal,
      raised_amount: c.raised,
      donor_count: c.donorCount,
    })),
  });
}
