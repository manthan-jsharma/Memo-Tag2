"use server";

import { createClient } from "@supabase/supabase-js";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  type: string;
};

export async function submitContactForm(formData: ContactFormData) {
  // In a real implementation, you would use environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { error } = await supabase.from("contacts").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        inquiry_type: formData.type,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}
