import Airtable from "airtable";

// Initialize Airtable with your API key
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Connect to your base
const base = airtable.base(process.env.AIRTABLE_BASE_ID as string);

// Get the different tables from your base
const journalTable = base("Journal");
const imagesTable = base("Images");
const pageContentTable = base("PageContent");

// Type for journal entries
export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string;
}

// Type for image entries
export interface ImageEntry {
  id: string;
  imageUrl: string;
  journalEntryId: string;
  altText?: string;
}

// Type for page content
export interface PageContent {
  id: string;
  type: string; // 'title', 'subtitle', 'footer'
  content: string;
}

// Function to fetch all journal entries
export async function getJournalEntries(): Promise<JournalEntry[]> {
  const records = await journalTable
    .select({
      sort: [{ field: "date", direction: "desc" }],
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    title: record.get("title") as string,
    date: record.get("date") as string,
    content: record.get("content") as string,
  }));
}

// Function to fetch a single journal entry by ID
export async function getJournalEntry(
  id: string
): Promise<JournalEntry | null> {
  try {
    const record = await journalTable.find(id);
    return {
      id: record.id,
      title: record.get("title") as string,
      date: record.get("date") as string,
      content: record.get("content") as string,
    };
  } catch (error) {
    console.error("Error fetching journal entry:", error);
    return null;
  }
}

// Function to fetch images for a journal entry
export async function getImagesForJournalEntry(
  journalEntryId: string
): Promise<ImageEntry[]> {
  const records = await imagesTable
    .select({
      filterByFormula: `{journalEntryId} = '${journalEntryId}'`,
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    imageUrl: record.get("imageUrl") as string,
    journalEntryId: record.get("journalEntryId") as string,
    altText: record.get("altText") as string,
  }));
}

// Function to fetch all images
export async function getAllImages(): Promise<ImageEntry[]> {
  const records = await imagesTable.select().all();

  return records.map((record) => ({
    id: record.id,
    imageUrl: record.get("imageUrl") as string,
    journalEntryId: record.get("journalEntryId") as string,
    altText: record.get("altText") as string,
  }));
}

// Function to fetch all page content
export async function getPageContent(): Promise<Record<string, string>> {
  const records = await pageContentTable.select().all();

  const contentMap: Record<string, string> = {};

  records.forEach((record) => {
    const type = record.get("type") as string;
    const content = record.get("content") as string;
    contentMap[type] = content;
  });

  return contentMap;
}

// Type for combined journal entry with image
export interface JournalEntryWithImage extends JournalEntry {
  image: string;
}

// Function to fetch journal entries with their associated images
export async function getJournalEntriesWithImages(): Promise<
  JournalEntryWithImage[]
> {
  const entries = await getJournalEntries();
  const images = await getAllImages();

  // Create a map of journal entry ID to image URL
  const imageMap: Record<string, string> = {};
  images.forEach((image) => {
    imageMap[image.journalEntryId] = image.imageUrl;
  });

  // Combine journal entries with their images
  return entries.map((entry) => ({
    ...entry,
    image: imageMap[entry.id] || "",
  }));
}
