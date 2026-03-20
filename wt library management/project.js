// FETCH BOOKS
async function fetchBooks() {
    const response = await fetch('project.php?action=list');
    const books = await response.json();

    const tableBody = document.getElementById('bookTableBody');
    tableBody.innerHTML = '';

    books.forEach(book => {
        const statusClass = book.status === 'Available' ? 'available' : 'borrowed';

        tableBody.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td><span class="${statusClass}">${book.status}</span></td>
                <td><button onclick="toggleBook(${book.id})">Toggle</button></td>
            </tr>
        `;
    });
}

// ADD BOOK
async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    if (!title || !author) return alert("Fill all fields");

    await fetch('project.php?action=add', {
        method: 'POST',
        body: JSON.stringify({ title, author })
    });

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';

    fetchBooks();
}

// TOGGLE STATUS
async function toggleBook(id) {
    await fetch('project.php?action=toggle', {
        method: 'POST',
        body: JSON.stringify({ id })
    });

    fetchBooks();
}

// SEARCH
function filterBooks() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let rows = document.querySelectorAll('#bookTableBody tr');

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}

// LOAD DATA
window.onload = fetchBooks;