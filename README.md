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
| **Home** | [`index.html`](index.html) | High-impact hero featuring authentic CBT luxury custom home builds, Commercial & Residential construction badge, quick-stats banner (15+ years experience, 5.0★ rating, 100+ projects), embedded quote card, verified services grid, seamless gutter & commercial highlight strip, interactive before/after roof slider, authentic local reviews, and full Facebook spotlight on Justin Fry's tear-down rebuilds. |
| **Services** | [`services.html`](services.html) | In-depth breakdown of CBT's commercial and residential specializations (Turnkey custom home builds & structural framing, architectural & metal roofing, custom composite/wood decks, seamless aluminum gutters, leaf guards & vinyl siding, and interior remodeling) with material specs, 4-step quality process, and FAQ accordion. |
| **Project Gallery** | [`gallery.html`](gallery.html) | Interactive filterable project gallery (All, Roofing, Custom Home Builds & Framing, Custom Decks, Seamless Gutters, Siding & Garages, Interior Remodeling) showcasing 21 authentic projects directly from CBT Construction's Facebook page, accompanied by a fullscreen Lightbox modal with next/prev controls, keyboard navigation, and instant quote triggers. |
| **Contact & Estimate** | [`contact.html`](contact.html) | Justin Fry direct contact details, operating hours (Mon–Fri 8:00 AM – 6:00 PM, 24/7 emergency storm response), detailed county-by-county service coverage list, official Facebook link, and a robust interactive quote request form powered by Web3Forms & Pushover. |

---

## 🔨 3. Verified Service Offerings & Scope (Commercial & Residential)

1. **Roofing Systems (Commercial & Residential):**
   * Asphalt architectural shingle installation & complete tear-off replacement.
   * Standing seam and ribbed residential, commercial, and agricultural metal roofing.
   * Continuous ridge vent cut & installations, emergency leak detection, rapid storm tarping, and flashing repairs.
   * Comprehensive hail and wind storm damage inspections with insurance claim documentation.

2. **Custom Home Builds, Commercial Construction & Structural Framing:**
   * Ground-up turnkey custom residential home builds (e.g. Ricky Schopp custom residence in Effingham).
   * Commercial construction, build-outs, and structural framing.
   * Timber-framed entry porticos, gable rooflines, stone wainscoting facades, and complete tear-down rebuild transformations.

3. **Outdoor Living & Custom Decks:**
   * High-end multi-tier composite decks (Trex) with black aluminum balusters, picture-framed fascia, and custom stairways.
   * Heavy-duty pressure-treated natural timber decks and lakeside walkouts.

4. **Seamless Gutters, Siding & Garages:**
   * Custom-measured seamless aluminum K-style rain gutters, oversized downspouts, leaf guards, and metal roof snow retention guards.
   * Premium horizontal lap vinyl siding, soffit/fascia wrapping, and detached garage exterior upgrades.

5. **Interior Remodeling & Finishing:**
   * Handcrafted distressed brick veneer dining room accent walls.
   * Basement framing, drywall finishing, insulation, and moisture barriers.
   * Interior solid-core pre-hung doors, casings, and trim carpentry.

---

## ⚡ 4. Interactive Forms & Lead Dispatch Integration (Formspree + Pushover Email)

The website features client-validated estimate forms configured for **Formspree** forwarding directly to **Justin Fry's Pushover Email**:

### 1. Formspree -> Pushover Email Lead Forwarding
* **Shared Pushover Email Ready:** Since Justin Fry uses the same Pushover email for both of his businesses (Mr. Lube and CBT Construction), every form submission from this website automatically includes:
  * `_subject`: `🔨 CBT CONSTRUCTION LEAD: <Service> — <Name> (<Town>)`
  * `business`: `CBT Construction`
  * A clean formatted summary block (`message`) with a clickable `tel:+1...` phone link so Justin immediately knows the alert is for **CBT Construction** when it pops up on his phone.
* **Active Formspree Endpoint:** All 5 quote forms across the site are connected live to `https://formspree.io/f/mqppjnpd` in [`assets/js/main.js`](assets/js/main.js) and the HTML form `action` attributes.

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

* Targeted local search terms: `Custom Home Builder Effingham IL`, `Roofing Vandalia IL`, `Commercial & Residential Contractor Central IL`, `Cowden IL Roofer & Seamless Gutters`.
* Complete Schema.org `LocalBusiness`, `RoofingContractor`, and `GeneralContractor` structured JSON-LD embedded on the home page.
* Semantic HTML5 tags (`<main>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<details>`).
