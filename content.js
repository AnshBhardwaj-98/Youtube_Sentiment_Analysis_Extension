// API key - youtube data api v3
const API_KEY = "";

const CHECK_INTERVAL = 1000;

let lastVideoId = null;

// sidebar element
function waitForSecondaryInner(callback) {
  const interval = setInterval(() => {
    const secondaryInner = document.querySelector("#secondary-inner");
    if (secondaryInner) {
      clearInterval(interval);
      callback(secondaryInner);
    }
  }, 500);
}

function createSidebar() {
  if (document.getElementById("yt-sidebar-extension"))
    return document.getElementById("yt-sidebar-extension");

  const sidebar = document.createElement("div");
  sidebar.id = "yt-sidebar-extension";

  // Styling
  sidebar.style.width = "100%";
  sidebar.style.height = "560px";
  sidebar.style.backgroundColor = "#1e1e1e";
  sidebar.style.color = "#fff";
  sidebar.style.overflowY = "scroll";
  sidebar.style.padding = "10px";
  sidebar.style.fontFamily = "Arial, sans-serif";
  sidebar.style.fontSize = "13px";
  sidebar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  sidebar.style.marginBottom = "10px";

  waitForSecondaryInner((secondaryInner) => {
    secondaryInner.prepend(sidebar);
  });

  return sidebar;
}

// Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// video ID from URL
function getVideoId() {
  try {
    const u = new URL(window.location.href);
    return (
      u.searchParams.get("v") ||
      (u.pathname.startsWith("/shorts/") ? u.pathname.split("/")[2] : null)
    );
  } catch (err) {
    return null;
  }
}

async function fetchComments(videoId) {
  const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  let comments = [];
  let analysisComments = [];
  let pageToken = "";

  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/commentThreads");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("videoId", videoId);
    url.searchParams.set("maxResults", "100");
    url.searchParams.set("order", "time");
    url.searchParams.set("key", API_KEY);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url);
    //   throw new Error(`YouTube API error: ${res.status} ${res.statusText}`);
    if (!res.ok) return [];

    const data = await res.json();

    (data.items || []).forEach((item) => {
      const snippet = item.snippet.topLevelComment.snippet;
      const published = new Date(snippet.publishedAt);
      if (published >= yearAgo) {
        comments.push({
          author: snippet.authorDisplayName,
          text: snippet.textDisplay,
          publishedAt: snippet.publishedAt,
        });
        analysisComments.push(snippet.textDisplay);
      }
    });

    pageToken = data.nextPageToken || "";
  } while (pageToken);

  const analysisUrl = new URL(
    "https://youtube-sentiment-analysis-2.onrender.com/predict"
  );
  let analysisRes = await fetch(analysisUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comments: analysisComments,
    }),
  });

  analysisRes = await analysisRes.json();

  return { comments: comments, analysisResults: analysisRes };
}

// Display comments in sidebar
function renderComments(comments, analysisResults, sidebar) {
  sidebar.innerHTML = `
  <h3 style="margin: 20px 0; padding: 12px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white; border-radius: 8px; text-align: center; font-size: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    <i class="fas fa-comment-alt" style="margin-right: 10px;"></i>Comment Sentiment Summary
    </h3>

    <p style="background: #f0f9ff; padding: 12px; border-left: 4px solid #2575fc; border-radius: 4px; font-size: 1.1rem;">
        <b style="color: #2c5282;">Overall Sentiment:</b> 
        <span style="color: #38a169; font-weight: bold; text-transform: uppercase; margin-left: 8px;">
            ${
              analysisResults.overall_sentiment
            } <i class="fas fa-smile" style="margin-left: 5px;"></i>
        </span>
    </p>

    <div style="display: flex; justify-content: space-between; gap: 12px; margin: 20px 0;">
        <div style="flex: 1; background: linear-gradient(135deg, #38a169 0%, #48bb78 100%); color: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <p style="margin: 0; font-size: 1.2rem;"><i class="fas fa-thumbs-up" style="margin-right: 8px;"></i><b>Positive: </b></p>
            <p style="font-size: 2rem; margin: 8px 0; font-weight: bold;">${
              analysisResults.total_positive
            }</p>
        </div>
        
        <div style="flex: 1; background: linear-gradient(135deg, #e53e3e 0%, #f56565 100%); color: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <p style="margin: 0; font-size: 1.2rem;"><i class="fas fa-thumbs-down" style="margin-right: 8px;"></i><b>Negative:</b></p>
            <p style="font-size: 2rem; margin: 8px 0; font-weight: bold;">${
              analysisResults.total_negative
            }</p>
        </div>
        
        <div style="flex: 1; background: linear-gradient(135deg, #3182ce 0%, #4299e1 100%); color: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <p style="margin: 0; font-size: 1.2rem;"><i class="fas fa-meh" style="margin-right: 8px;"></i><b>Neutral:</b></p>
            <p style="font-size: 2rem; margin: 8px 0; font-weight: bold;">${
              analysisResults.total_neutral
            }</p>
        </div>
    </div>

    <h4 style="margin: 25px 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #4299e1; color: #fff; display: flex; align-items: center;">
        <i class="fas fa-star" style="color: #f6e05e; margin-right: 10px;"></i>Top 10 Positive Comments:
    </h4>

    ${analysisResults.top_10_positive_comments
      .map(
        (comment) => `
        <div
          style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #38a169;"
        >
          <p style="margin: 0; font-style: italic; color: #4a5568;">${comment}</p>
        </div>
      `
      )
      .join("")}

    

    <h3 style="margin: 25px 0 15px 0; padding: 12px; background: linear-gradient(135deg, #805ad5 0%, #6b46c1 100%); color: white; border-radius: 8px; text-align: center; font-size: 1.3rem;">
        <i class="fas fa-history" style="margin-right: 10px;"></i> Last 24Hrs Comments (${
          comments.length
        })
    </h3>
`;

  if (!comments.length) {
    sidebar.innerHTML += "<p>No recent comments found.</p>";
    return;
  }

  comments.forEach((c) => {
    const div = document.createElement("div");
    div.style.borderBottom = "1px solid #333";
    div.style.padding = "6px 0";
    div.innerHTML = `<b style = "color: red; margin-bottom:4px;">${escapeHtml(
      c.author
    )}</b><br >${escapeHtml(
      c.text
    )}<br><small style = "color : green">${new Date(
      c.publishedAt
    ).toLocaleString()}</small>`;
    sidebar.appendChild(div);
  });
}

// Fetch & render comments
async function fetchAndDisplayComments(videoId) {
  const sidebar = createSidebar();
  sidebar.innerHTML = `<p style = "width: 100%; text:center; font-size:2rem">Loading Analysis...</p>`;
  try {
    const { comments, analysisResults } = await fetchComments(videoId);
    console.log(analysisResults);

    renderComments(comments, analysisResults, sidebar);
  } catch (err) {
    sidebar.innerHTML = `<p style="color:red">Error fetching comments: ${err.message}</p>`;
  }
}

// Check for video changes (YouTube SPA)
function checkVideoChange() {
  const videoId = getVideoId();
  if (videoId && videoId !== lastVideoId) {
    lastVideoId = videoId;
    fetchAndDisplayComments(videoId);
  }
}

checkVideoChange();
setInterval(checkVideoChange, CHECK_INTERVAL);
