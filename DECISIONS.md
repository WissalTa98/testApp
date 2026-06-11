# Architecture Decision Log

## Why did you structure the component the way you did?
Separation of concerns, each layer has one job:
      models/  
      — Defines the data shape (Product interface, category/status types). Uses union types instead of enums so they match JSON strings directly.
      services/ 
      — Loads the data. If I later switch from a JSON file to an API call, I only change this one file.
      utils/ 
      — Filtering, sorting, and pagination are plain functions. Easy to reuse.
      styles/_colors.scss 
      — All brand colours in one place.
      components/product-list/ 
      — The component itself only manages state and handles clicks. The heavy logic lives in utils.

## What trade-offs did you consciously make?
    Faked loading with setTimeout, a real app would use HTTP calls.
    All data in memory works for 40 items, not for thousands.
    No unit tests, utils are testable by design.

## Where could this component break at scale?
    Large datasets: Everything loads into memory. 10k+ rows would freeze the UI. Needs server-side pagination.
    No debounce: Search filters on every keystroke. Laggy with big data.
    Hardcoded columns: Adding/removing columns means editing HTML. Should be a dynamic config array.

## What would change if this needed to support both Angular AND React?
I'd turn the component into a Web Component using @angular/elements. That way it becomes a regular HTML tag <product-list> that React can just drop in.

## Describe one specific bug or edge case you encountered and how you fixed it.
A bug I hit: the loading spinner worked on first load but never showed again.
When I first built the loading state, I set isLoading = true in ngOnInit and isLoading = false at the end of loadProducts(). 
That worked fine for the initial load, the spinner appeared, data loaded, spinner disappeared.
But when the user filtered, sorted, or changed pages, there was no spinner. The data just jumped instantly. 
I wanted a brief loading indicator on every action to feel consistent.
My fix was a withLoading() helper that wraps any action in a setTimeout. 
It sets isLoading = true immediately, then runs the actual logic after a short delay and sets isLoading = false when done. 
Every action like filter, sort, page change just calls withLoading(() => this.doWork()).
