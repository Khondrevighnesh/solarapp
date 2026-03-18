import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Schemes() {
  return (
    <ScrollView style={styles.container}>

      {/* HERO SECTION */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Go Solar & Save Big ☀️</Text>
        <Text style={styles.heroSub}>
          Reduce electricity bill up to 90% with Govt Subsidy
        </Text>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>Check Eligibility</Text>
        </TouchableOpacity>
      </View>

      {/* HEADING */}
      <Text style={styles.heading}>Solar Schemes & Services</Text>

      {/* GOVT SCHEME */}
      <SolarCard
        icon={<MaterialCommunityIcons name="solar-power" size={28} color="#2563EB" />}
        title="PM Surya Ghar Yojana"
        desc="Get subsidy up to ₹78,000 on rooftop solar installation."
        badge="Gov Subsidy"
        buttonText="Apply Now"
      />

      {/* FINANCE */}
      <SolarCard
        icon={<Ionicons name="flash" size={28} color="#16A34A" />}
        title="Solar EMI Plan"
        desc="Install solar with EMI starting ₹1500/month."
        badge="Popular"
        buttonText="Get Quote"
      />

      {/* AMC */}
      <SolarCard
        icon={<Ionicons name="shield-checkmark" size={28} color="#F59E0B" />}
        title="Solar AMC Maintenance"
        desc="Panel cleaning, monitoring & breakdown support."
        badge="Recommended"
        buttonText="Buy AMC"
      />

      {/* WHY SOLAR */}
      <Text style={styles.heading}>Why Install Solar?</Text>

      <View style={styles.infoCard}>
        <Text>⚡ Save Huge Electricity Bills</Text>
        <Text>🌱 Eco-Friendly Energy</Text>
        <Text>🏠 Increase Property Value</Text>
        <Text>🔋 Energy Independence</Text>
      </View>

      {/* FINAL CTA */}
      <View style={styles.ctaBox}>
        <Text style={styles.ctaText}>Ready to Install Solar?</Text>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>Register Solar Plant</Text>
        </TouchableOpacity>
        
      </View>

    </ScrollView>
  );
}

/* ⭐ Reusable Modern Card */
const SolarCard = ({ icon, title, desc, badge, buttonText }: any) => (
  <View style={styles.modernCard}>
    
    <View style={styles.row}>
      <View style={styles.iconBox}>{icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>

        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
    </View>

    <TouchableOpacity style={styles.cardBtn}>
      <Text style={styles.cardBtnText}>{buttonText}</Text>
    </TouchableOpacity>

  </View>
);

/* ⭐ Styles */
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F1F5F9"
  },

  hero:{
    backgroundColor:"#2563EB",
    padding:25
  },

  heroTitle:{
    color:"white",
    fontSize:26,
    fontWeight:"bold",
    marginBottom:6
  },

  heroSub:{
    color:"white",
    marginBottom:15
  },

  primaryBtn:{
    backgroundColor:"#F59E0B",
    padding:14,
    borderRadius:10,
    alignItems:"center"
  },

  btnText:{
    color:"white",
    fontWeight:"bold"
  },

  heading:{
    fontSize:22,
    fontWeight:"bold",
    marginTop:22,
    marginBottom:10,
    paddingHorizontal:20
  },

  modernCard:{
    backgroundColor:"white",
    padding:18,
    borderRadius:18,
    marginHorizontal:20,
    marginBottom:18,
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:10,
    elevation:4
  },

  row:{
    flexDirection:"row",
    alignItems:"center"
  },

  iconBox:{
    backgroundColor:"#EEF2FF",
    padding:12,
    borderRadius:12,
    marginRight:12
  },

  cardTitle:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:4
  },

  cardDesc:{
    color:"#6B7280"
  },

  badge:{
    backgroundColor:"#DCFCE7",
    alignSelf:"flex-start",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:20,
    marginTop:6
  },

  badgeText:{
    color:"#16A34A",
    fontWeight:"bold",
    fontSize:12
  },

  cardBtn:{
    backgroundColor:"#2563EB",
    marginTop:15,
    padding:12,
    borderRadius:10,
    alignItems:"center"
  },

  cardBtnText:{
    color:"white",
    fontWeight:"bold"
  },

  infoCard:{
    backgroundColor:"white",
    marginHorizontal:20,
    padding:18,
    borderRadius:12
  },

  ctaBox:{
    padding:30,
    alignItems:"center"
  },

  ctaText:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:15
  }
});