# MEMOIR

A personal journal with a swipeable image carousel for displaying memories. This application displays journal entries with images in a minimalist black design, closely resembling the provided screenshot.

## Features

- Swipeable image carousel in the center of the page
- Journal entry display with title, date, and content
- Dark mode design with clean typography
- Airtable integration for storing journal entries and images

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- An Airtable account with an API key

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd memoir
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Airtable:
   - Create a base with a table named "Journal"
   - Add columns: "title" (text), "date" (date), "content" (long text), "image" (URL)
   - The base ID `appGxtVTCpnDl3gwv` is already configured in the code

4. Create a `.env.local` file in the root directory with your Airtable API key:
   ```
   AIRTABLE_API_KEY=your_airtable_api_key_here
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Airtable Structure

For this application to work correctly, your Airtable should have the following structure:

- **Base ID**: appGxtVTCpnDl3gwv (or update it in `src/lib/airtable.ts`)
- **Table name**: Journal
- **Fields**:
  - `title` (Single line text)
  - `date` (Date)
  - `content` (Long text)
  - `image` (URL - link to the image)

## Customize

To customize the appearance:
- Edit `src/app/globals.css` for site-wide styles
- Update the components in `src/components/` for specific UI elements

## Deployment

This project can be deployed to Vercel or any other hosting service that supports Next.js applications.

```bash
npm run build
```

## Technology Stack

- Next.js 15.3 (React 19)
- Tailwind CSS
- Airtable API
- Embla Carousel for the swipeable image display
