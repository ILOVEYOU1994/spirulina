document.addEventListener("DOMContentLoaded", function () {
    let currentChapter = 1;
    let currentVerse = 1;
    let data = {}; 

    // Load JSON
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            data = json;
            displayVerses();
        });

    // Display verses
    function displayVerses() {
        let chapter = data.find(c => c.chapter === currentChapter);
        let verse = chapter.verses.find(v => v.verse_number === currentVerse);
        let container = document.getElementById("verseContainer");
        container.innerHTML = `
            <h3>${chapter.chapter_name} - Verse ${verse.verse_number}</h3>
            <p>${verse.sanskrit}</p>
            <p>${verse.english}</p>
            <button onclick="shareVerse('${verse.english}')">Share</button>
        `;
    }

    // Share function
    window.shareVerse = function (text) {
        if (navigator.share) {
            navigator.share({ text });
        } else {
            alert("Sharing not supported.");
        }
    };

    // Search feature
    document.getElementById("searchInput").addEventListener("input", function () {
        let searchQuery = this.value.toLowerCase();
        let results = [];
        
        data.forEach(chapter => {
            chapter.verses.forEach(verse => {
                if (verse.english.toLowerCase().includes(searchQuery)) {
                    results.push(`${chapter.chapter_name} - ${verse.verse_number}: ${verse.english}`);
                }
            });
        });

        document.getElementById("verseContainer").innerHTML = results.join("<br>");
    });

    // Previous/Next buttons
    document.getElementById("prevButton").addEventListener("click", function () {
        if (currentVerse > 1) {
            currentVerse--;
        } else if (currentChapter > 1) {
            currentChapter--;
            currentVerse = data.find(c => c.chapter === currentChapter).verses.length;
        }
        displayVerses();
    });

    document.getElementById("nextButton").addEventListener("click", function () {
        let chapter = data.find(c => c.chapter === currentChapter);
        if (currentVerse < chapter.verses.length) {
            currentVerse++;
        } else if (currentChapter < data.length) {
            currentChapter++;
            currentVerse = 1;
        }
        displayVerses();
    });

    // Floating menu for chapters
    document.getElementById("menuButton").addEventListener("click", function () {
        let menu = document.getElementById("chapterList");
        menu.innerHTML = data.map(c => `<button onclick="changeChapter(${c.chapter})">${c.chapter_name}</button>`).join("");
        menu.classList.toggle("hidden");
    });

    window.changeChapter = function (chapter) {
        currentChapter = chapter;
        currentVerse = 1;
        displayVerses();
    };
});