import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://jdeckblmnwqcndhlznuu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkZWNrYmxtbndxY25kaGx6bnV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4ODI0MjgsImV4cCI6MjAzMzQ1ODQyOH0.0uvxLL_YNqjEbheubs0lXMockHhirqa60uKQWFseq34';

export default createClient(supabaseUrl, supabaseKey)