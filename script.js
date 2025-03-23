document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            if (!data || !data.Gita) {
                console.error("Invalid JSON format: Missing 'Gita' key");
                return;
            }

            if (document.getElementById("chapters")) {
                loadChapters(data.Gita);
            }
        })
        .catch(error => console.error("Error loading data.json:", error));
});

function loadChapters(chapters) {
    let container = document.getElementById("chapters");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    chapters.forEach((chapter, index) => {
        let div = document.createElement("div");
        div.className = "chapter-card";
        div.innerHTML = `
            <h2>Chapter ${index + 1}: ${chapter.chapterName}</h2>
            <p>${chapter.chapterDescription}</p>
            <button onclick="openChapter(${index})">Read Chapter</button>
        `;
        container.appendChild(div);
    });
}

function openChapter(index) {
    localStorage.setItem("selectedChapter", index);
    window.location.href = "chapterlist.html";
}