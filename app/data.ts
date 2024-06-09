
// import { useLoaderData } from "@remix-run/react";
// import supabase from "~/utils/supabase";

// export const loader = async () => {
//   const { data: students, error } = await supabase
//     .from('students')
//     .select('*');

//   console.log('data:', students)
//   if (error) {
//     console.log('error:', error.message)
//   }

//   return {
//     students
//   }
// };