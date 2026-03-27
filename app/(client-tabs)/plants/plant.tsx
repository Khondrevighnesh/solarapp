import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Modal,
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";
import { Theme } from "../../theme/theme";
import { GlobalStyles } from "../../theme/globalStyles";
import { useAuth } from "../../../context/AuthContext";

export default function Plants() {
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!user) {
      router.replace("/(client-tabs)/dashboard");
    }
  }, [user]);

  /* 🔙 BACK FLOW */
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        router.replace("/(client-tabs)/home"); // ✅ Plants → Home
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );

      return () => sub.remove();
    }, []),
  );

  if (!user) return null;

  /* 🔍 FILTER */
  const filteredPlants = user.plants?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HEADER (LIKE CARDS) */}
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingTop: 50,
            paddingBottom: 25,
            paddingHorizontal: 16,
            borderRadius: 25,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* LEFT */}
            <View>
              <Text style={{ color: "white", fontSize: 16 }}>📍 India</Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                👋 {user.name}
              </Text>

              <Text style={{ color: "#DCFCE7", marginTop: 4 }}>
                Select your plant
              </Text>
            </View>

            {/* RIGHT ICONS */}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setProfileOpen(true)}>
                <Ionicons name="person-circle" size={42} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setNotifyOpen(true)}>
                <Ionicons
                  name="notifications"
                  size={38}
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 🔍 SEARCH */}
          <View
            style={{
              marginTop: 18,
              backgroundColor: "white",
              borderRadius: 14,
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="search" size={18} color="#6B7280" />

            <TextInput
              placeholder="Search plant..."
              placeholderTextColor="#6B7280"
              value={search}
              onChangeText={setSearch}
              style={{
                flex: 1,
                padding: 10,
                color: "#000",
              }}
            />
          </View>
        </View>

        {/* 🌱 PLANTS */}
        <View style={{ padding: 10, marginTop: 6 }}>
          {filteredPlants?.length === 0 ? (
            <Text style={{ textAlign: "center", color: Colors.subText }}>
              No plants found 😕
            </Text>
          ) : (
            filteredPlants?.map((p: any) => (
              <TouchableOpacity
                key={p.id}
                style={[
                  GlobalStyles.card,
                  {
                    borderRadius: 18,
                    marginBottom: 12,
                    padding: 16,
                  },
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/plants/cards",
                    params: { plantId: p.id },
                  })
                }
              >
                <Text
                  style={{
                    fontSize: Theme.font.title,
                    fontWeight: "bold",
                  }}
                >
                  {p.name}
                </Text>

                <Text style={{ color: Colors.subText, marginTop: 4 }}>
                  Today: {p.today} kWh
                </Text>

                <View style={{ position: "absolute", right: 16, top: 20 }}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* 👤 PROFILE MODAL */}
      <Modal transparent visible={profileOpen} animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
          onPress={() => setProfileOpen(false)}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Ionicons name="person-circle" size={70} color={Colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
              {user.name}
            </Text>
            <Text style={{ color: Colors.subText }}>{user.email}</Text>

            <TouchableOpacity
              onPress={logout}
              style={{
                marginTop: 15,
                backgroundColor: Colors.danger,
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 🔔 NOTIFICATIONS */}
      <Modal transparent visible={notifyOpen} animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
          onPress={() => setNotifyOpen(false)}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Notifications 🔔</Text>

            <Text style={{ marginTop: 10 }}>• High generation today</Text>
            <Text>• Cleaning due</Text>
            <Text>• Performance drop alert</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}
