import { JournalEntry } from '@/lib/airtable';

interface JournalEntryDetailProps {
  entry: JournalEntry | null;
}

export default function JournalEntryDetail({ entry }: JournalEntryDetailProps) {
  if (!entry) {
    return (
      <div className="w-full max-w-[min(600px,80vh)] mx-auto p-3 bg-white/5 backdrop-blur-md rounded-md">
        <p className="text-center text-gray-400">Select a journal entry to view details</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[min(600px,80vh)] mx-auto p-3 bg-white/5 backdrop-blur-md rounded-md border border-white/10 overflow-hidden">
      <div className="text-xs text-gray-400 mb-2">
        {new Date(entry.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric', 
          year: 'numeric'
        })}
      </div>
      <div className="prose prose-invert prose-xs max-w-none max-h-[15vh] overflow-y-auto pr-2">
        {entry.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-2 text-sm leading-relaxed text-gray-200">{paragraph}</p>
        ))}
      </div>
    </div>
  );
} 