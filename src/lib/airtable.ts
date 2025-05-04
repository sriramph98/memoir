import Airtable from "airtable";

// Initialize Airtable with your API key
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Connect to your base
const base = airtable.base("appGxtVTCpnDl3gwv");

// Get the "Journal" table from your base
const journalTable = base("Journal");

// Type for journal entries
export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
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
    image: record.get("image") as string,
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
      image: record.get("image") as string,
    };
  } catch (error) {
    console.error("Error fetching journal entry:", error);
    return null;
  }
}
