// SupabaseProvider.jsx
import { createClient } from "@supabase/supabase-js";
import React, { createContext, useContext, useState, useEffect } from "react";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  useEffect(() => {
    const initializeSupabase = () => {
      const client = createClient(supabaseUrl, supabaseKey);
      setSupabase(client);
      setLoading(false);
    };

    initializeSupabase();
  }, [supabaseUrl, supabaseKey]);

  return (
    <SupabaseContext.Provider value={{ supabase, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
