document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterNumber = urlParams.get("chapter");

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const chapter = data.find(ch => ch.chapter == chapterNumber);

            if (!chapter) return;

            document.getElementById("chapter-info").innerHTML = `
                <div class="chapter-container">
                    <h2>Chapter ${chapter.chapter}: ${chapter.chapter_name}</h2>
                    <p>${chapter.chapter_description}</p>
                </div>
            `;

            let versesHTML = "";
            chapter.verses.forEach(verse => {
                versesHTML += `
                    <div class="verse-container">
                        <h3>Verse ${verse.verse_number}</h3>
                        <p><b>Sanskrit:</b> ${verse.sanskrit}</p>
                        <p><b>English:</b> ${verse.english}</p>
                        <p><b>Hindi:</b> ${verse.hindi}</p>
                        <p><b>Marathi:</b> ${verse.marathi}</p>
                        <button onclick="shareVerse('${verse.verse_number}', '${verse.english}')">📤 Share</button>
                    </div>
                `;
            });

            document.getElementById("verses-container").innerHTML = versesHTML;

            let prevChapter = chapter.chapter - 1;
            let nextChapter = chapter.chapter + 1;
            let navButtons = "";

            if (prevChapter > 0) {
                navButtons += `<button onclick="openChapter(${prevChapter})">← Previous Chapter</button>`;
            } else {
                navButtons += `<button onclick="window.location.href='index.html'">← Back to Chapters</button>`;
            }

            if (nextChapter <= data.length) {
                navButtons += `<button onclick="openChapter(${nextChapter})">Next Chapter →</button>`;
            } else {
                navButtons += `<button onclick="window.location.href='index.html'">Back to Chapters →</button>`;
            }

            document.getElementById("navigation-buttons").innerHTML = navButtons;
        });
});