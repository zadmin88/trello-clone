"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export type State = {
  errors?: {
    title?: string[];
  };
  message: string | null;
};

const createBoardSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = createBoardSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Database error",
    };
  }

  revalidatePath("/organization/org_2YVqTcMESeZiAJ8pb5UNJAcGyXJ");
  redirect("/organization/org_2YVqTcMESeZiAJ8pb5UNJAcGyXJ");
}
