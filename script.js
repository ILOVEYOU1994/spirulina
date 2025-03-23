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
            loadChapterList(); // Ensure chapter list loads
        })
        .catch(error => console.error("Error loading data.json:", error));

    document.getElementById("toggleChapters").addEventListener("click", toggleChapterList);
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

    listContainer.innerHTML = ""; // Clear previous content

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
    if (!list) return;
    list.classList.toggle("visible");
}