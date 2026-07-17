/**
 * Hivu HR Employee App — Configuration
 * ================================
 *
 * STEP 1: Create Supabase project at https://supabase.com
 * STEP 2: Create tables using SUPABASE_SETUP.md
 * STEP 3: Paste your credentials below
 * STEP 4: Save and deploy!
 */

const HIVU_CONFIG = {

  // ── SUPABASE CREDENTIALS ──────────────────────────────────
  // Get these from: Supabase Dashboard → Settings → API
  supabaseUrl: "https://kaiiffxgnpjsgswuhukj.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthaWlmZnhnbnBqc2dzd3VodWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNzA5MDcsImV4cCI6MjA5OTg0NjkwN30.E5PArYijB5aJ8eBNQ_tr0gUPpa4oAM72VmHCjqWoFw0",

  // ── COMPANY DETAILS ───────────────────────────────────────
  company: {
    name: "ABC Pvt. Ltd.",
    city: "New Delhi",
    logo: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 120%22%3E%3Ccircle cx=%2260%22 cy=%2220%22 r=%2212%22 fill=%22%2300D4FF%22/%3E%3Ctext x=%2210%22 y=%2250%22 font-size=%2240%22 font-weight=%22bold%22 fill=%22%2300D4FF%22%3EH%3C/text%3E%3C/svg%3E"
  },

  // ── OFFICE GPS LOCATION ───────────────────────────────────
  office: {
    lat: 28.589954,
    lng: 77.031847,
    name: "Head Office",
    radius: 100
  },

  // ── GEOFENCE SETTINGS ─────────────────────────────────────
  geofence: {
    strictMode: true,
    graceMinutes: 15,
    officeStartTime: "09:30",
    officeEndTime: "18:30"
  },

  // ── BRANCH OFFICES (optional) ─────────────────────────────
  branches: []

};

// Initialize Supabase with error handling
let supabase = null;

function initSupabase() {
  if (typeof HIVU_CONFIG === 'undefined' || !HIVU_CONFIG.supabaseUrl || !HIVU_CONFIG.supabaseKey) {
    console.error("Supabase credentials not configured");
    return null;
  }
  
  try {
    supabase = window.supabase.createClient(
      HIVU_CONFIG.supabaseUrl,
      HIVU_CONFIG.supabaseKey
    );
    console.log("✅ Supabase initialized successfully");
    return supabase;
  } catch (error) {
    console.error("Supabase initialization error:", error);
    return null;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}
