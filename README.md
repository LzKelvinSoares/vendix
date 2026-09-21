# Vendix

Vendix is a mobile-first resale valuation app built with Next.js. It lets a reseller scan or upload a product photo, add basic purchase details, and receive an AI-assisted resale evaluation with a suggested listing price, expected margin, confidence score, comparable marketplace examples, price trend points, and generated listing copy.

## Current app flow

1. **Dashboard**
   - Shows evaluated items from the local portfolio.
   - Displays listing status: `for sale`, `sold`, `archived`, or `draft`.
   - Summarizes estimated total margin, realized profit, average time to sale, and best category.

2. **New item**
   - User uploads a product image from camera/gallery.
   - User enters item name, category, brand, and purchase price.
   - The client sends the item data to `/api/evaluate`.

3. **AI evaluation**
   - The server calls Gemini through `@google/genai` using `GoogleGenAI`.
   - Default model: `gemini-3.6-flash`.
   - Gemini receives the image and item hints, then returns structured JSON.
   - The response is normalized into the app's `VendixItem` shape.

4. **Evaluation screen**
   - Shows suggested resale price.
   - Shows estimated profit margin and confidence score.
   - Shows estimated comparable listings and price history.

5. **Item detail**
   - Shows the item photo, pricing details, generated description, and publish actions.
   - Includes deep-link style actions for OLX and Facebook Marketplace.

6. **Metrics**
   - Shows total estimated profit, realized sold profit, average time to sale, and profitable categories.

> Note: comparable marketplace listings are currently AI-estimated examples. Vendix does not perform live scraping yet.

## Features

- Responsive web app for mobile and desktop
- PWA manifest and app icon
- Camera/gallery upload with preview
- Gemini-powered image and item evaluation
- Structured server-side AI response schema
- Local portfolio stored in browser `localStorage`
- Dashboard, new item flow, evaluation view, item detail, and metrics
- Generated marketplace-ready listing description
- OLX and Facebook Marketplace publish links
- Dark-mode-aware visual system using emerald, petrol blue, charcoal, and gold

## Tech stack

- Next.js App Router
- React
- TypeScript
- `@google/genai`
- CSS variables and responsive layouts
- Browser `localStorage` for prototype persistence

## Environment variables

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

`GEMINI_MODEL` is optional. If it is not set, the app uses:

```txt
gemini-3.6-flash
```

A template is available in:

```txt
.env.example
```

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Next.js.

## Useful scripts

```bash
npm run dev        # start development server
npm run build      # production build
npm run start      # run production server
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Project structure

```txt
app/
  api/evaluate/route.ts           # API boundary for AI valuation
  globals.css                     # Global styles and responsive UI system
  layout.tsx                      # Root app layout and metadata
  page.tsx                        # App entry page

components/vendix/
  VendixApp.tsx                   # Client app shell and view orchestration
  dashboard/                      # Dashboard UI
  evaluation/                     # Evaluation result UI
  hero/                           # Landing/summary hero UI
  item-detail/                    # Item detail and publish UI
  metrics/                        # Metrics UI
  navigation/                     # Top navigation
  new-item/                       # Camera/upload + item form
  shared/                         # Reusable presentational components

hooks/
  useVendixItems.ts               # Item state, localStorage persistence, metrics, status updates

lib/client/
  fixtures/seed-items.ts          # Initial demo data
  services/evaluation/            # Browser-to-API evaluation client

lib/server/
  services/valuation/             # Server-side Gemini valuation service

shared/constants/
  ai.ts                           # Gemini model and response schema
  app.ts                          # App-level constants
  database.ts                     # Storage keys
  forms.ts                        # Form options/categories
  marketplace.ts                  # Marketplace names, URLs, item conditions

shared/helpers/
  json.ts                         # JSON response parsing helpers
  media.ts                        # Data URL / inline image helpers
  number.ts                       # Numeric normalization helpers
  valuation.ts                    # Valuation prompt/content builders and normalizers

shared/types/
  dashboard.ts                    # Dashboard metric types
  evaluation.ts                   # Evaluation request/response types
  item.ts                         # Vendix item types
  marketplace.ts                  # Marketplace/listing types
  index.ts                        # Shared type exports

shared/utils/
  currency.ts                     # Currency formatting
  status.ts                       # Item status display labels
```

## AI valuation architecture

The client does not call Gemini directly. It calls:

```txt
POST /api/evaluate
```

The route delegates to:

```txt
lib/server/services/valuation/gemini-valuation.service.ts
```

That service:

1. Reads `GEMINI_API_KEY` and `GEMINI_MODEL` from the server environment.
2. Creates a `GoogleGenAI` client.
3. Builds Gemini content from item form data and optional base64 image.
4. Uses a structured response schema from `shared/constants/ai.ts`.
5. Parses Gemini JSON with `shared/helpers/json.ts`.
6. Normalizes the AI result with `shared/helpers/valuation.ts`.
7. Returns a `VendixItem` to the client.

## Data model

The main item shape is `VendixItem`, defined in:

```txt
shared/types/item.ts
```

It contains:

- identity and product fields
- purchase price
- suggested resale price
- estimated margin
- confidence score
- item status
- uploaded image data URL
- generated listing description
- estimated comparable listings
- price history points

## Persistence

This prototype stores items in browser `localStorage` using the key from:

```txt
shared/constants/database.ts
```

The persistence and metrics logic lives in:

```txt
hooks/useVendixItems.ts
```

## Marketplace pricing notes

The current implementation asks Gemini to produce estimated comparable listings for OLX, Vinted, Facebook Marketplace, and eBay. These are useful for UX prototyping, but they are not live marketplace data.

Recommended production next steps:

1. Integrate official marketplace APIs or compliant data providers where available.
2. Avoid scraping flows that violate marketplace terms of service.
3. Store real comparable listing snapshots in a database.
4. Calculate final suggested price using weighted comps, condition, category demand, fees, and sell-through velocity.
5. Add user authentication and per-user item portfolios.
