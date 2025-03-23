let jsonData;

document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            if (document.getElementById("chapters")) {
                loadChapters();
            } else if (document.getElementById("chapterTitle")) {
                loadChapterDetails();
            }
        });

    let toggleBtn = document.getElementById("toggleChapters");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleChapterList);
    }
});

function loadChapters() {
    let container = document.getElementById("chapters");
    if (!container) return;

    jsonData.Gita.forEach((chapter, index) => {
        let div = document.createElement("div");
        div.className = "chapter-card";
        div.innerHTML = `<h2>${chapter.chapterName}</h2><p>${chapter.chapterDescription}</p>`;
        div.onclick = () => {
            localStorage.setItem("selectedChapter", index);
            window.location.href = "chapterlist.html";
        };
        container.appendChild(div);
    });
}

function loadChapterDetails() {
    let index = localStorage.getItem("selectedChapter");
    if (index === null) return;

    let chapter = jsonData.Gita[index];
    let chapterTitle = document.getElementById("chapterTitle");
    let chapterDescription = document.getElementById("chapterDescription");
    let verseContainer = document.getElementById("verses");

    if (chapterTitle) chapterTitle.innerText = chapter.chapterName;
    if (chapterDescription) chapterDescription.innerText = chapter.chapterDescription;
    if (!verseContainer) return;

    verseContainer.innerHTML = "";

    chapter.verses.forEach(verse => {
        let div = document.createElement("div");
        div.className = "verse-card";
        div.innerHTML = `
            <h3>${verse.verseNumber}</h3>
            <p>${verse.sanskrit}</p>
            <p><b>English:</b> ${verse.english}</p>
            <p><b>Hindi:</b> ${verse.hindi}</p>
            <p><b>Marathi:</b> ${verse.marathi}</p>
            <button onclick="shareVerse('${verse.verseNumber}', '${verse.sanskrit}', '${verse.english}', '${verse.hindi}', '${verse.marathi}')">Share</button>
        `;
        verseContainer.appendChild(div);
    });

    let prevBtn = document.getElementById("prevChapter");
    let nextBtn = document.getElementById("nextChapter");

    if (prevBtn) prevBtn.onclick = () => navigateChapter(-1);
    if (nextBtn) nextBtn.onclick = () => navigateChapter(1);
}

function navigateChapter(direction) {
    let index = parseInt(localStorage.getItem("selectedChapter"));
    let newIndex = index + direction;

    if (newIndex < 0 || newIndex >= jsonData.Gita.length) {
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
    if (list) {
        list.style.left = list.style.left === "0px" ? "-250px" : "0px";
    }
}