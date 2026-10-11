export const trueNorthLinks = {
  foundingCircle: "https://docs.google.com/forms/d/e/1FAIpQLSf3gQC9VCtYgQWpsayIf19Q29Z4T4ldbm8liIjCrTA57THcsQ/viewform",
  substack: "https://substack.com/@hertruenorth3",
  linkedin: "https://in.linkedin.com/company/her-true-north",
  youtube: "https://www.youtube.com/@TrueNorth-her",
  instagram: "#instagram-placeholder",
} as const;

export const trueNorthSocialLinks = [
  { label: "LinkedIn", href: trueNorthLinks.linkedin, placeholder: false },
  { label: "Substack", href: trueNorthLinks.substack, placeholder: false },
  { label: "YouTube", href: trueNorthLinks.youtube, placeholder: false },
  { label: "Instagram", href: trueNorthLinks.instagram, placeholder: true },
] as const;
