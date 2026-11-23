# ISHAAN Enterprises – Corporate Website

An original, premium industrial-engineering website for ISHAAN Enterprises, Patlipada, Thane West — its own identity, not modelled on any other company.

## Look and feel
- Classy palette (no blue/black): warm ivory background `#FAF7F2`, deep maroon/wine `#6B1E2E` as main brand colour, copper/bronze accent `#B87333`, warm taupe `#5C4B43` for text, soft sand `#EDE4D6` for sections.
- Fonts: Space Grotesk (headings), DM Sans (body).
- Signature design idea: "engineering blueprint" touches — fine copper grid lines, numbered service sections (01–08), angled photo frames with copper corner marks, and large editorial headlines.
- Split banner on home: bold headline on one side, stacked work photos on the other, with a ticker strip listing all services.
- Stats counters, staggered photo layouts, smooth reveal animations.
- Placeholder work photos generated for each service (replaceable later with real photos).

## Pages
1. **Home** – big banner ("Engineering. Insulation. Fabrication."), key numbers, services overview, featured projects, clients strip, call-to-action for enquiry.
2. **About** – company story, proprietor Ishaan Maurya, vision/mission, values, safety & quality commitment.
3. **Services** – overview of all 8 services, each with its own detail page:
   - MEP Works
   - Boiler Hot/Cold Insulation
   - Sheet Metal Cladding
   - Fireline Fabrication / FRP Lining
   - HVAC Ducting
   - Manpower Solutions
   - Scaffolding Services
   - Fabrication & Welding
4. **Projects** – photo gallery of work with filter by service.
5. **Clients** – client logo grid (placeholder names until real ones are provided) and short testimonials.
6. **Manpower Enquiry** – form for companies requesting skilled/unskilled manpower (company, contact, trade needed, number of workers, duration, site location).
7. **Contact** – address, phone 7304355146, email ishaanenterprises05@gmail.com, map, and enquiry form.

Shared header with navigation + "Get a Quote" button, and a footer with contact details and service links. Mobile-friendly. WhatsApp/call buttons alongside forms.

## Enquiries
- Contact and Manpower forms are saved in Lovable Cloud (viewable under Cloud → Database).
- Email alerts to the owner need a verified email domain; can be added later.

## Technical details
- Enable Lovable Cloud; tables `contact_submissions` and `manpower_enquiries` with RLS, insert via server functions with zod validation, no public reads.
- Separate route per page, service detail routes `/services/$slug`, unique head() metadata per route.
- Design tokens in src/styles.css (oklch), fonts via link tags in root.

## Content I invented (please send real ones later)
Years of experience, project counts, client names, testimonials, and photos are placeholders.
