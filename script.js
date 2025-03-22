document.addEventListener("DOMContentLoaded", function () {
    fetchChapters();
    document.getElementById("toggleMenu").addEventListener("click", toggleMenu);
});

function fetchChapters() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => displayChapters(data))
        .catch(error => console.error("Error fetching chapters:", error));
}

function displayChapters(data) {
    const uniqueChapters = [...new Set(data.map(item => item.chapter))];
    const menu = document.getElementById("chapterMenu");

    menu.innerHTML = "<h3>Chapters</h3>";
    uniqueChapters.forEach(chapter => {
        menu.innerHTML += `<button onclick="fetchVerses(${chapter})">Chapter ${chapter}</button>`;
    });
}

function fetchVerses(chapter) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => displayVerses(data.filter(item => item.chapter === chapter)))
        .catch(error => console.error("Error fetching verses:", error));
}

function displayVerses(verses) {
    let translationsHTML = "";
    const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4", "#D1C4E9"];

    verses.forEach((record, index) => {
        const bgColor = colors[index % colors.length];

        translationsHTML += `
            <div class="verse-container" style="background: ${bgColor};">
                <p><strong>Chapter ${record.chapter}, Verse ${record.verse_number}:</strong></p>
                <p><b>Sanskrit:</b> ${record.sanskrit}</p>
                <p><b>English:</b> ${record.english}</p>

                <button class="toggleTranslation" onclick="toggleTranslation(${record.verse_number})">📖 Show Translation</button>
                <div id="translation-${record.verse_number}" class="translation">
                    <p><b>Hindi:</b> ${record.hindi}</p>
                    <p><b>Marathi:</b> ${record.marathi}</p>
                </div>
            </div>
        `;
    });

    document.getElementById("translations").innerHTML = translationsHTML;
}

function toggleTranslation(verseId) {
    let translationDiv = document.getElementById(`translation-${verseId}`);
    translationDiv.style.display = translationDiv.style.display === "none" ? "block" : "none";
}

function toggleMenu() {
    let menu = document.getElementById("chapterMenu");
    menu.style.left = menu.style.left === "0px" ? "-220px" : "0px";
}
