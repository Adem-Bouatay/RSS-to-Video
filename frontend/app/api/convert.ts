import { convertRequest } from "../../types/schema";
import { publicRequest } from "@/lib/utils";

export async function convertURL(url: string) {
  // Validate the url
  const validatedFields = convertRequest.safeParse({
    url: url,
  });

  // If the url is not valid, return the error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Fetch data...
  let data = JSON.stringify({
    url: url,
  });
  try {
    const res = await publicRequest.post("/process", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
