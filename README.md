# CBT Construction — High-Converting Contractor Website

A modern, high-converting, fully responsive multi-page web platform built for **CBT Construction**, owned and operated by **Justin Fry**, serving **Vandalia, Cowden, Effingham, Shelbyville**, and surrounding Central Illinois communities.

---

## 🏗️ 1. Business & Brand Identity

* **Business Name:** CBT Construction
* **Owner & Operator:** Justin Fry
* **Contact Phone:** [(217) 254-3091](tel:+12172543091)
* **Headquarters:** 3125 N 1800 St, Cowden, IL 62422
* **Service Area:** Fayette, Effingham, and Shelby Counties (Vandalia, Cowden, Effingham, Shelbyville, Altamont, Pana, St. Elmo, Brownstown, Teutopolis, Ramsey)
* **Design Aesthetic:** Rugged, dependable, modern contractor aesthetic. Deep charcoal/slate tones (`#0f172a`, `#1e293b`), crisp typography (Montserrat & Inter), safety/construction amber accents (`#f59e0b`), and authentic job photography.

---

## 📄 2. Page Structure & Features

The site is built as a lightning-fast, 4-page responsive web experience:

| Page | File | Description & Key Conversion Features |
| :--- | :--- | :--- |
| **Home** | [`index.html`](index.html) | High-impact hero featuring authentic CBT luxury custom build, quick-stats banner (15+ years experience, 5.0★ rating, 100+ projects), embedded quote card, verified services grid, interactive before/after roof slider, authentic local reviews, and full Facebook spotlight on Justin Fry's tear-down rebuilds. |
| **Services** | [`services.html`](services.html) | In-depth breakdown of CBT's real specializations (Architectural & metal roofing, ground-up new home construction & structural framing, custom composite/wood decks, vinyl siding & seamless gutters, and interior remodeling) with material specs, 4-step quality process, and FAQ accordion. |
| **Project Gallery** | [`gallery.html`](gallery.html) | Interactive filterable project gallery (All, Roofing, New Construction, Custom Decks, Siding & Garages, Interior Remodeling) showcasing 21 authentic projects directly from CBT Construction's Facebook page, accompanied by a fullscreen Lightbox modal with next/prev controls, keyboard navigation, and instant quote triggers. |
| **Contact & Estimate** | [`contact.html`](contact.html) | Justin Fry direct contact details, operating hours (Mon–Fri 8:00 AM – 6:00 PM, 24/7 emergency storm response), detailed county-by-county service coverage list, official Facebook link, and a robust interactive quote request form. |

---

## 🔨 3. Verified Service Offerings & Scope

1. **Roofing Systems:**
   * Asphalt architectural shingle installation & complete tear-off replacement.
   * Standing seam and ribbed residential/agricultural metal roofing.
   * Continuous ridge vent cut & installations, emergency leak detection, rapid storm tarping, and flashing repairs.
   * Comprehensive hail and wind storm damage inspections with insurance claim documentation.

2. **New Home Construction & Structural Framing:**
   * Ground-up turnkey residential builds (e.g. Ricky Schopp custom residence in Effingham).
   * Structural framing, timber-framed entry porticos, gable rooflines, and stone wainscoting facades.
   * Complete tear-down and rebuild transformations.

3. **Outdoor Living & Custom Decks:**
   * High-end multi-tier composite decks (Trex) with black aluminum balusters, picture-framed fascia, and custom stairways.
   * Heavy-duty pressure-treated natural timber decks and lakeside walkouts.

4. **Siding, Garages & Gutters:**
   * Premium horizontal lap vinyl siding installations on homes and detached garages.
   * Seamless aluminum K-style gutters with downspouts and snow guard roof protection.

5. **Interior Remodeling & Finishing:**
   * Handcrafted distressed brick veneer dining room accent walls.
   * Basement framing, drywall finishing, insulation, and moisture barriers.
   * Interior solid-core pre-hung doors, casings, and trim carpentry.

---

## ⚡ 4. Interactive Forms & Lead Dispatch Integration

The website features client-validated estimate forms with dual dispatch options:

### 1. Formspree + Pushover Lead Forwarding
* **Form Action:** Configured with placeholder `https://formspree.io/f/your-form-id`.
* **Client Validation:** Full Name, Phone (10-digit validation), Property Location/Town, Service Category Dropdown, Timeline/Urgency, and Project Scope details.
* **Instant Pushover Push Notification (`api/lead-webhook.js`):**
  When a homeowner submits a request, the payload can be forwarded to Justin Fry's mobile phone via Pushover with high-priority siren notification, instantly linking to one-tap phone callback.
* **To Activate Pushover on Justin's Phone:**
  1. Create a free app token at [Pushover.net](https://pushover.net).
  2. Set `PUSHOVER_USER_KEY` and `PUSHOVER_API_TOKEN` in your Vercel project environment variables.
  3. Change the form action or Formspree Webhook endpoint to `/api/lead-webhook`.

### 2. Direct Mobile SMS Dispatch (`sms:+12172543091`)
Every form includes a **"Send Directly via Mobile SMS"** button. When clicked on a phone or Mac, it opens the Messages app with Justin's cell number pre-filled with the exact project scope formatted cleanly:
```text
🔨 CBT CONSTRUCTION - QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━
👤 Name: John Miller
📞 Phone: (217) 555-0123
📍 Address: Vandalia, IL
🏗️ Service: Roofing Repair/Replacement
⏱️ Timeline: Emergency (Storm / Active Leak)
✉️ Email: john@example.com
📝 Details: Shingles lifted in recent storm, need inspection
━━━━━━━━━━━━━━━━━━━━
Sent from CBT Construction Website
```

---

## 🚀 5. Local Development & Deployment

### Running Locally
To test the site locally:
```bash
# Using standard Python 3 server:
python3 -m http.server 3000

# Or using npx serve:
npx serve -l 3000 .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploying to Vercel
This repository is 100% deployment-ready for Vercel:
1. Push this repository to GitHub.
2. In the Vercel dashboard, click **"Add New Project"** and select the repository.
3. Keep default settings (Framework Preset: Other / Static).
4. Click **Deploy**. Vercel will automatically apply [`vercel.json`](vercel.json) rules (clean URLs and asset caching).

---

## 🔍 6. SEO & Schema.org LocalBusiness Markup

* Targeted local search terms: `Roofing Vandalia IL`, `Effingham IL contractor`, `Cowden IL roofer`, `stamped concrete Shelbyville IL`.
* Complete Schema.org `LocalBusiness`, `RoofingContractor`, and `GeneralContractor` structured JSON-LD embedded on the home page.
* Semantic HTML5 tags (`<main>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<details>`).
