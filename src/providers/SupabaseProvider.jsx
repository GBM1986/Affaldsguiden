import { createClient } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"

const SupabaseContext = createContext()

export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null)
  const [loading, setLoading] = useState(true)  // Add loading state

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
  
  useEffect(() => {
    const initializeSupabase = () => {
      const client = createClient(supabaseUrl, supabaseKey)
      setSupabase(client)
      setLoading(false)  // Set loading to false when client is ready
    }

    initializeSupabase()
  }, [supabaseUrl, supabaseKey])

  return (
    <SupabaseContext.Provider value={{ supabase, loading }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => useContext(SupabaseContext)
