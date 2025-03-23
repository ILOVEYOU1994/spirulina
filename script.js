let jsonData;

document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            if (document.getElementById("chapters")) {
                loadChapters();
            } else {
                loadChapterDetails();
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function loadChapters() {
    let container = document.getElementById("chapters");
    if (!jsonData || !Array.isArray(jsonData)) {
        console.error("Invalid JSON format");
        return;
    }

    jsonData.forEach((chapter, index) => {
        let div = document.createElement("div");
        div.className = "chapter-card";
        div.innerHTML = `<h2>${chapter.chapter_name}</h2><p>${chapter.chapter_description}</p>`;
        div.onclick = () => {
            localStorage.setItem("selectedChapter", index);
            window.location.href = "chapterlist.html";
        };
        container.appendChild(div);
    });
}

function loadChapterDetails() {
    let index = localStorage.getItem("selectedChapter");
    if (index === null || !jsonData || !jsonData[index]) {
        console.error("Invalid chapter index");
        return;
    }

    let chapter = jsonData[index];
    document.getElementById("chapterTitle").innerText = chapter.chapter_name;
    document.getElementById("chapterDescription").innerText = chapter.chapter_description;

    let verseContainer = document.getElementById("verses");
    chapter.verses.forEach(verse => {
        let div = document.createElement("div");
        div.className = "verse-card";
        div.innerHTML = `
            <h3>${verse.verse_number}</h3>
            <p>${verse.sanskrit}</p>
            <p><b>English:</b> ${verse.english}</p>
            <p><b>Hindi:</b> ${verse.hindi}</p>
            <p><b>Marathi:</b> ${verse.marathi}</p>
            <button onclick="shareVerse('${verse.verse_number}', '${verse.sanskrit}', '${verse.english}', '${verse.hindi}', '${verse.marathi}')">Share</button>
        `;
        verseContainer.appendChild(div);
    });

    document.getElementById("prevChapter").onclick = () => navigateChapter(-1);
    document.getElementById("nextChapter").onclick = () => navigateChapter(1);
}

function navigateChapter(direction) {
    let index = parseInt(localStorage.getItem("selectedChapter"));
    let newIndex = index + direction;

    if (newIndex < 0 || newIndex >= jsonData.length) {
        window.location.href = "index.html";
    } else {
        localStorage.setItem("selectedChapter", newIndex);
        window.location.reload();
    }
}

function shareVerse(verseNumber, sanskrit, english, hindi, marathi) {
    let text = `Verse ${verseNumber}:\n${sanskrit}\nEnglish: ${english}\nHindi: ${hindi}\nMarathi: ${marathi}`;
    if (navigator.share) {
        navigator.share({ text: text });
    } else {
        alert("Sharing not supported on this device.");
    }
}

function toggleChapterList() {
    let list = document.getElementById("chapterListContainer");
    list.style.left = list.style.left === "0px" ? "-250px" : "0px";
}