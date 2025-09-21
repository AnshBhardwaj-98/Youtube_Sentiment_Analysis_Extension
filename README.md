# YouTube Comment Sentiment Analyzer

**Description:**  
A Chrome extension that injects a sidebar on YouTube video pages, fetches comments for the current video, analyzes sentiment, and displays sentiment scores in real-time.

---

## Features

- Automatically injects a sidebar while watching any YouTube video.  
- Fetches comments for the current video using the **YouTube Data API v3**.  
- Performs sentiment analysis on the comments.  
- Displays sentiment metrics:  
  - Overall sentiment (Positive / Negative / Neutral)  
  - Total number of positive, negative, and neutral comments  
  - Top 10 comments by sentiment  
- Works seamlessly in the browser while watching videos.  

---

## Requirements

- A valid **YouTube Data API v3 key** is required to fetch comments.  

---

## Installation

### Manual Installation (Developer Mode)
1. Download or clone this repository.  
2. Open **Chrome** → go to `chrome://extensions/`.  
3. Enable **Developer mode** (top right).  
4. Click **Load unpacked**.  
5. Select the folder containing this extension.  
6. The extension sidebar should appear automatically when watching YouTube videos.  

---

## Usage

1. Open any YouTube video.  
2. The extension sidebar will automatically appear on the side of the video.  
3. It will fetch comments for the current video using your **YouTube Data API key**.  
4. The sidebar displays:  
   - Overall sentiment of comments  
   - Counts of positive, negative, and neutral comments  
   - Top 10 comments  

---

## Development

1. Clone the repository:  
   ```bash
   git clone <repo-url>
