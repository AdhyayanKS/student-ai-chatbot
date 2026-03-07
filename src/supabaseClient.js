import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://rkshstqcegtwjmmfailw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc2hzdHFjZWd0d2ptbWZhaWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3Nzg0NTQsImV4cCI6MjA4ODM1NDQ1NH0.4IwX5oToS9jj8S8j6ufyXb6PcPMCJOQsttuJaW2q_KA"

export const supabase = createClient(supabaseUrl, supabaseKey)