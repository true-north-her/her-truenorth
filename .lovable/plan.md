# TrueNorth Newsletter and Social Links

## Goal
Add a warm, polished mailing-list invitation at the bottom of the home page and expand the footer with TrueNorth’s social channels, without changing the rest of the site.

## What will change
1. **Newsletter section** — add a reusable TrueNorth-styled newsletter section immediately above the footer.
   - Preserve the supplied Brevo form’s working subscription destination and required field names.
   - Include first name, last name, email address, required newsletter consent, unsubscribe note, and subscribe action.
   - Keep the supplied success and error messages, with accessible status announcements and clear field labels.
   - Retain Brevo’s spam-trap and locale fields.
   - Use the existing TrueNorth palette, Libre Baskerville/DM Sans typography, coastal editorial spacing, and accessible focus states instead of the pasted form’s unrelated Roboto/Futura styling and background image.
   - Load only the Brevo behavior needed for validation and submission; do not expose private credentials or add a new backend.

2. **Social links** — add LinkedIn, Substack, YouTube, and Instagram to the footer using recognizable icons and accessible labels.
   - Use the existing live Substack URL.
   - Keep LinkedIn, YouTube, and Instagram as clearly isolated placeholder URLs until the real profiles are supplied.
   - Store all social destinations in structured shared link data so placeholders can be replaced in one place.

3. **Responsive and accessible presentation**
   - Keep the form easy to complete on desktop and mobile, with full-width tap-friendly controls on small screens.
   - Ensure labels, consent text, errors, success state, keyboard navigation, and contrast remain clear.
   - Respect reduced-motion preferences and avoid horizontal overflow.

## Verification
- Submit a safe test through the live form flow and confirm Brevo returns a visible success or precise error response.
- Verify the existing Substack link, placeholder social behavior, field validation, consent requirement, keyboard flow, and mobile/desktop layouts.
- Confirm the rest of the page, including the hero, Founding Circle, team section, and smooth scrolling, remains unchanged.

## Technical details
- Build a reusable newsletter component rather than inserting the pasted inline HTML directly into the page.
- Keep Brevo’s hosted form action and expected DOM hooks while translating the markup into React-safe structure.
- Use the project’s existing semantic design tokens and button component; do not import Brevo’s global stylesheet or its external fonts.
