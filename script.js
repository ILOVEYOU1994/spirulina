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
    let listContainer = document.getElementById("chapterListContainer");

    if (toggleBtn && listContainer) {
        toggleBtn.addEventListener("click", function () {
            listContainer.classList.toggle("visible");

            // Move button to the right when list is open, else reset to default
            if (listContainer.classList.contains("visible")) {
                toggleBtn.style.left = "270px";
            } else {
                toggleBtn.style.left = "20px";
            }
        });
    }
});

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