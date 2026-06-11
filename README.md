# TestApp

A filterable, sortable, paginated data table built from scratch with Angular 21, TypeScript, and hand-written SCSS. No UI libraries used.

## Features

- Multi-column search (name, category, price, stock, status)
- Category and status dropdown filters
- Column sorting with direction toggle
- Pagination with configurable page size (10 / 25 / 50)
- Loading spinner and empty state
- Responsive layout (1024px, 768px, 480px breakpoints)

## Prerequisites

- [Node.js](https://nodejs.org/) v20
- npm v10 or later

## Installation

```bash
git clone https://github.com/WissalTa98/testApp.git
cd testApp
npm install
```

## Running Locally

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Build

```bash
npm run build
```

Build output goes to `dist/`.

## Project Structure

```
src/app/
├── models/          → Interfaces and types (Product)
├── data/            → Static dataset (products.json)
├── services/        → Data access layer (ProductService)
├── utils/           → Pure functions (filter, sort, pagination)
├── styles/          → Shared SCSS partials (_colors.scss)
└── components/
    └── products-list/  → Main component (TS + HTML + SCSS)
```
## Tech Stack

- Angular 21
- TypeScript ~5.9
- SCSS (hand-written, no UI library)
