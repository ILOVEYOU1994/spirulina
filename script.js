document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let chaptersHTML = "";
            let chapterListHTML = "";

            data.forEach(chapter => {
                chaptersHTML += `
                    <div class="chapter-container">
                        <h2>Chapter ${chapter.chapter}: ${chapter.chapter_name}</h2>
                        <p>${chapter.chapter_description}</p>
                        <button onclick="openChapter(${chapter.chapter})">View Chapter</button>
                    </div>
                `;

                chapterListHTML += `<li onclick="openChapter(${chapter.chapter})">${chapter.chapter_name}</li>`;
            });

            document.getElementById("chapter-container").innerHTML = chaptersHTML;
            document.getElementById("chapter-list").innerHTML = chapterListHTML;
        });
});

function openChapter(chapter) {
    window.location.href = `chapterlist.html?chapter=${chapter}`;
}

function toggleChapterMenu() {
    document.getElementById("chapter-menu").classList.toggle("active");
}