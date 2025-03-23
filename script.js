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
            loadChapterList();
        })
        .catch(error => console.error("Error loading data.json:", error));

    let toggleBtn = document.getElementById("toggleChapters");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleChapterList);
    }
});

function loadChapters() {
    let container = document.getElementById("chapters");
    jsonData.forEach((chapter, index) => {
        let div = document.createElement("div");
        div.className = "chapter-card";
        div.innerHTML = `<h2>Chapter ${index + 1}: ${chapter.chapter_name}</h2><p>${chapter.chapter_description}</p>`;
        div.onclick = () => {
            localStorage.setItem("selectedChapter", index);
            window.location.href = "chapterlist.html";
        };
        container.appendChild(div);
    });
}

function loadChapterList() {
    let listContainer = document.getElementById("chapterList");
    if (!jsonData || !listContainer) return;
    listContainer.innerHTML = "";
    jsonData.forEach((chapter, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `Chapter ${index + 1}`;
        listItem.onclick = () => {
            localStorage.setItem("selectedChapter", index);
            window.location.href = "chapterlist.html";
        };
        listContainer.appendChild(listItem);
    });
}

function toggleChapterList() {
    let list = document.getElementById("chapterListContainer");
    let toggleBtn = document.getElementById("toggleChapters");

    list.classList.toggle("visible");

    if (list.classList.contains("visible")) {
        toggleBtn.style.left = "270px"; // Move button to the right of the opened container
    } else {
        toggleBtn.style.left = "20px"; // Move button back to original position
    }
}

function loadChapterDetails() {
    let index = localStorage.getItem("selectedChapter");
    if (index === null) return;
    let chapter = jsonData[index];

    document.getElementById("chapterTitle").innerText = `Chapter ${chapter.chapter}: ${chapter.chapter_name}`;
    document.getElementById("chapterDescription").innerText = chapter.chapter_description;

    let verseContainer = document.getElementById("verses");
    verseContainer.innerHTML = "";

    chapter.verses.forEach(verse => {
        let div = document.createElement("div");
        div.className = "verse-card";
        div.innerHTML = `
            <h3>Verse ${verse.verse_number}</h3>
            <p><b>Sanskrit:</b> ${verse.sanskrit}</p>
            <p><b>English:</b> ${verse.english}</p>
            <p><b>Hindi:</b> ${verse.hindi}</p>
            <p><b>Marathi:</b> ${verse.marathi}</p>
            <button onclick="shareVerse('${verse.verse_number}', '${verse.english}')">📤 Share</button>
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