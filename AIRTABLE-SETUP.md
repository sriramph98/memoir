# Airtable Setup Guide for Memoir

This guide explains how to set up your Airtable database for the Memoir journal application. The application uses three separate tables to store journal entries, images, and page content.

## Base Information

- **Base ID**: appGxtVTCpnDl3gwv
- **API Key**: patMuzaXcxyXjYyLz.bdacc6d5408edb6b95e15718ddd7d77f20e2aaf942c53f9f5a7d3eea765f7ace

## Tables Structure

### 1. Journal Table

This table stores the text content of your journal entries.

**Table Name**: `Journal`

**Fields**:
- `title` (Single line text): The title of the journal entry
- `date` (Date): The date of the journal entry
- `content` (Long text): The main content/description of the journal entry

### 2. Images Table

This table stores the images associated with journal entries.

**Table Name**: `Images`

**Fields**:
- `imageUrl` (URL): The URL to the image
- `journalEntryId` (Single line text): The ID of the journal entry this image belongs to
- `altText` (Single line text, optional): Alternative text for the image

### 3. Page Content Table

This table stores static content like page title, subtitle, and footer text.

**Table Name**: `PageContent`

**Fields**:
- `type` (Single line text): The type of content (e.g., 'title', 'subtitle1', 'subtitle2', 'footer')
- `content` (Single line text): The actual content text

## Sample Data

### Journal Table
| title              | date       | content                                                 |
|--------------------|------------|--------------------------------------------------------|
| First memories     | 2023-01-15 | These are the traces of memories lost to light...      |
| Summer reflections | 2023-06-22 | The summer light created the perfect moment...         |
| Winter passage     | 2023-12-10 | The stillness of winter has its own voice...           |

### Images Table
| imageUrl                                                   | journalEntryId |
|------------------------------------------------------------|----------------|
| https://images.unsplash.com/photo-1519681393784-d120267933ba | rec123abc      |
| https://images.unsplash.com/photo-1470252649378-9c29740c9fa8 | rec456def      |
| https://images.unsplash.com/photo-1483664852095-d6cc6870702d | rec789ghi      |

### Page Content Table
| type      | content                   |
|-----------|---------------------------|
| title     | MEMOIR                    |
| subtitle1 | AN ARCHIVE OF SRIRAM'S    |
| subtitle2 | TRACES LOST TO LIGHT      |
| footer    | *IMAGES ARE GENERATED BY AI |

## Setting Up the Environment

1. Create a `.env.local` file in the root directory of the project.
2. Add your Airtable API key:
   ```
   AIRTABLE_API_KEY=your_api_key_here
   ```
3. The base ID (`appGxtVTCpnDl3gwv`) is already configured in the code.

## How the Data is Used

- **Journal Entries**: Each journal entry has text content stored in the Journal table.
- **Images**: Images are associated with journal entries through the `journalEntryId` field, which should match the Airtable record ID of the corresponding journal entry.
- **Page Content**: Static text elements like the page title are pulled from the Page Content table based on their type. 