import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sczgewzuuwxwpdvypefn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjemdld3p1dXd4d3BkdnlwZWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5ODE4ODMsImV4cCI6MjA1MjU1Nzg4M30.Rfn9dYJ1TV0HNfg6BQ31WZDx2GibsxMFDGn_MJwE2Jo'
export const supabase = createClient(supabaseUrl, supabaseKey)
