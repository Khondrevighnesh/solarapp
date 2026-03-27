import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* 🧾 TYPES */
type UserType = {
  name: string;
  email?: string;
  role?: "free" | "client" | "technician";
  plants?: any[]; // ✅ add this (important for your flow)
};

type ClientType = {
  name: string;
  plants: any[];
};

type AuthContextType = {
  /* 🟢 FREE / CLIENT USER */
  user: UserType | null;
  login: (userData: UserType) => Promise<void>;
  logout: () => Promise<void>;

  /* 🔵 PAID CLIENT (optional if separate) */
  client: ClientType | null;
  loginClient: (clientData: ClientType) => Promise<void>;
  logoutClient: () => Promise<void>;

  /* 🌱 NEW: LAST PLANT MEMORY */
  lastPlantId: string | number | null;
  setLastPlantId: (id: string | number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [client, setClient] = useState<ClientType | null>(null);

  const [lastPlantId, setLastPlantIdState] = useState<string | number | null>(
    null,
  );

  /* 🔄 LOAD DATA */
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedClient = await AsyncStorage.getItem("client");
        const storedPlant = await AsyncStorage.getItem("lastPlantId");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedClient) setClient(JSON.parse(storedClient));
        if (storedPlant) setLastPlantIdState(JSON.parse(storedPlant));
      } catch (e) {
        console.log("Error loading auth data");
      }
    };

    loadData();
  }, []);

  /* 🔐 LOGIN */
  const login = async (userData: UserType) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  /* 🚪 LOGOUT */
  const logout = async () => {
    setUser(null);
    setLastPlantIdState(null); // ✅ reset plant memory

    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("lastPlantId");
  };

  /* 🔐 CLIENT LOGIN */
  const loginClient = async (clientData: ClientType) => {
    setClient(clientData);
    await AsyncStorage.setItem("client", JSON.stringify(clientData));
  };

  /* 🚪 CLIENT LOGOUT */
  const logoutClient = async () => {
    setClient(null);
    await AsyncStorage.removeItem("client");
  };

  /* 🌱 SET LAST PLANT */
  const setLastPlantId = async (id: string | number) => {
    setLastPlantIdState(id);
    await AsyncStorage.setItem("lastPlantId", JSON.stringify(id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,

        client,
        loginClient,
        logoutClient,

        lastPlantId,
        setLastPlantId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* 🔑 HOOK */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
