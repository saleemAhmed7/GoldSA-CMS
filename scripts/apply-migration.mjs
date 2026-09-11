import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnvLocal();

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.");
    console.info("Please fill in your credentials in .env.local or execute the migration SQL via Supabase Dashboard SQL Editor.");
    process.exit(1);
  }

  const migrationPath = resolve(process.cwd(), "supabase/migrations/20260726000000_goldsa_cms_schema.sql");
  const sqlContent = readFileSync(migrationPath, "utf-8");

  console.log(`Connecting to Supabase at ${supabaseUrl}...`);
  const supabase = createClient(supabaseUrl, serviceKey);

  // Test connection
  const { error } = await supabase.from("users").select("count", { count: "exact", head: true });
  if (error && error.code !== "PGRST116" && !error.message.includes("does not exist")) {
    console.error("❌ Connection error:", error.message);
  } else {
    console.log("✅ Supabase project connected successfully.");
  }
}

runMigration().catch(console.error);
