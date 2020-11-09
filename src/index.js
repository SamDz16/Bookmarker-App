const form = document.querySelector("#myForm");
form.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // Prevent default form behaviour
  e.preventDefault();

  // Grab the form input values
  const siteName = document.querySelector("#siteName").value;
  const siteUrl = document.querySelector("#siteUrl").value;

  // The specified bookmark
  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Save to localStorage
  const bookmarks = fetchBookmarks();

  if (bookmarks.length === 0) {
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    UpdateBookmarksUI();
  } else {
    // Check if the bookmark doesn't already exist
    let exists = false;
    let book = {};
    bookmarks.forEach((Bookmark) => {
      if (Bookmark.url === bookmark.url) {
        exists = true;
        book = bookmark;
      }
    });
    if (!exists) {
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

      // Updating the UI
      UpdateBookmarksUI();

    } else {
      // Popping up an alert to the user
      // Grabing the parent Node
      const parent = document.querySelector(".jumbotron");
      const alert = document.createElement("div");
      alert.className = `alert alert-danger`;
      alert.innerHTML = `The <strong>${book.name.toLowerCase()}</strong> bookmark already exists!`;
      parent.insertBefore(alert, form);

      // remove the alert after 3s
      setTimeout(() => {
        document.querySelector(".alert.alert-danger").remove();
      }, 3000);
    }
  }
}

// Delete Bookmark
deleteBookmark = (bookmarkUrl) => {
  const bookmarks = fetchBookmarks();
  const newBookmarks = bookmarks.filter(({url}) => url !== bookmarkUrl);
  localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));

  // Update the UI to reflect the changes
  UpdateBookmarksUI();
}

// Fetching all the bookmarks which are stored in tje local storage
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks") === null) return [];
  return JSON.parse(localStorage.getItem("bookmarks"));
}

window.addEventListener("DOMContentLoaded", UpdateBookmarksUI);

// Grab the bookmarks container (#bookmarkResults)
const bookmarkResult = document.querySelector("#bookmarksResults");
let html = "";

function UpdateBookmarksUI() {
  bookmarkResult.innerHTML = "";
  const bookmarks = fetchBookmarks();

  bookmarks.forEach(bookmark => {
    bookmarkResult.innerHTML += `
    <div class="bookmark-container">
      <div class="bookmark-content">
        <h3 class="card-title"><i class="fab fa-${bookmark.name.toLowerCase()}"></i> ${bookmark.name}</h3>
        <div class="bookmark-links">
          <a href=${bookmark.url} class="btn btn-info" target="_blank">Visit</a>
          <a onclick="deleteBookmark(\`${bookmark.url}\`)" class="btn btn-danger" href="#">Delete</a>
        <div>
      <div>
    </div>
    `;
  });
};
