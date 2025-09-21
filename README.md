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

# Working ScreenShots
## Loading Analysis
<img width="1919" height="868" alt="Screenshot 2025-09-21 171702" src="https://github.com/user-attachments/assets/ad5562c0-ca70-4406-a4b8-fd48a952cc48" />

## Sentiment Scores of different videos
<img width="1920" height="1020" alt="Screenshot 2025-09-21 172310" src="https://github.com/user-attachments/assets/459d5aea-7c06-4e7a-ad21-40b73a34bee5" />
<img width="1919" height="864" alt="Screenshot 2025-09-21 172110" src="https://github.com/user-attachments/assets/04cc43fe-ef38-4a2c-a5b5-f3806931e022" />
<img width="1919" height="869" alt="Screenshot 2025-09-21 172022" src="https://github.com/user-attachments/assets/a7038e7a-ed8b-41d3-a717-23086b13ab40" />
<img width="1919" height="870" alt="Screenshot 2025-09-21 171853" src="https://github.com/user-attachments/assets/1b963ba2-390a-4c42-b862-6fdbb18268ac" />

---

## Sample Response from Sentiment Analysis API

{
  "overall_sentiment": "Positive",
  "top_10_positive_comments": [
    "WHY THE MOVIE TRÓIA IS SO IMPORTANT FOR US?",
    "The movie troya is very importante. Can to see?",
    "Not enough people talking about how fine Damson Idris is!!!!",
    "I'm 52 and have watched almost all of Pitt's films and many of his interviews and he is just consistently charming, sincere, funny, clever, witty and the opposite of arrogant/cocky. Love this man. Phenomenal actor too. Have watched many of his films more than six times each film. What a gem and a gift to art.",
    "Pitt is like a fine wine man",
    "This was a cute interview. I love how they participated and added their own questions.",
    "Liverpool is the best team to have ever existed in England",
    "Why does Brad have to be so damn cool and seem so relatable??? Even though he’s an insanely handsome gazillionaire.",
    "no way bro said messi is the best fb player",
    "my brain is going what region for British accent cause that really makes or breaks it, like what if he was from a town like 5 min drive from wales, or Liverpool, south east London, north east London, and the same goes for the states, what region? Midwest? Southern, Californian, New York, jersey accent, Boston accent, and Oklahoma accent, Texan so it all depends"
  ],
  "total_positive": 471,
  "total_negative": 125,
  "total_neutral": 335
}

## Development

1. Clone the repository:  
   ```bash
   git clone https://github.com/AnshBhardwaj-98/Youtube_Sentiment_Analysis_Extension/edit/main


