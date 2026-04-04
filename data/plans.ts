import { Colors } from "@/app/theme/colors";

 export const planFeatures = [
  { label: "Technician Access", key: "tech" },
  { label: "Admin Access", key: "admin" },
  { label: "Remote Support (Technical)", key: "remoteTech" },
  { label: "Remote Monitoring Support", key: "monitoring" },
  { label: "On-site Training", key: "training" },
  { label: "Post-Commissioning Access", key: "postComm" },
  { label: "Lead Access", key: "leads" },
  { label: "Warranty Claim Support", key: "warranty" },
  { label: "Solar Digilocker Access", key: "locker" },
];

 export const plans = [
  {
    name: "Basic Plan",
    price: "₹599",
    unit: "/kW/year",
    color: Colors.subText,
    features: { tech: true, admin: true, remoteTech: true, monitoring: true, training: true, postComm: false, leads: false, warranty: false, locker: true }
  },
  {
    name: "PV Protect (1-2 MW)",
    price: "₹799",
    unit: "/kW/year",
    color: Colors.info,
    features: { tech: true, admin: true, remoteTech: true, monitoring: true, training: true, postComm: false, leads: true, warranty: false, locker: true }
  },
  {
    name: "PV Protect Pro (3-10 MW)",
    price: "₹999",
    unit: "/kW/year",
    color: Colors.eco,
    isPopular: true,
    features: { tech: true, admin: true, remoteTech: true, monitoring: true, training: true, postComm: true, leads: true, warranty: true, locker: true }
  }
];