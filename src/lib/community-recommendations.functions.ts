import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createCommunityRecommendations } from "@/lib/community-recommendations.server";

const hopesSchema = z.string().trim().min(12, "Share a little more so we can make a thoughtful suggestion.").max(1200, "Please keep your note under 1,200 characters.");

export const getCommunityRecommendations = createServerFn({ method: "POST" })
  .inputValidator((input: { hopes: string }) => ({ hopes: hopesSchema.parse(input.hopes) }))
  .handler(async ({ data }) => createCommunityRecommendations(data.hopes));