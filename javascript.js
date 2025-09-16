let myLibrary = []

function Book(title, author, pages, hasRead, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
    this.info = () =>{
        if(hasRead){
            console.log(`${title} by ${author}, ${pages} pages, read already`);
        }else{
            console.log(`${title} by ${author}, ${pages} pages, not read yet`);
        }
    }
}

function addBookToHtml(book){
    const librarySection = document.querySelector(".library-section");
    let newBookHtml = document.createElement("div");
    newBookHtml.classList.add("library-box");
    newBookHtml.id = book.id;
    newBookHtml.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button class="readOption">${book.hasRead ? "Read" : "Not Read"}</button>
    <button class="delete">delete</button>
  `;
  let deleteButton = newBookHtml.querySelector(".delete");
  let updateButton = newBookHtml.querySelector(".readOption");
  if(book.hasRead){
        updateButton.style.backgroundColor = "green";
    }else{
        updateButton.style.backgroundColor = "red";
    }
  deleteButton.addEventListener("click", (e)=>{
    myLibrary = myLibrary.filter(b => b.id !== book.id);
    librarySection.removeChild(e.target.parentNode);
  });

  updateButton.addEventListener("click", (e) =>{
    if(book.hasRead){
        book.hasRead = false;
        updateButton.textContent = "Not Read"
        updateButton.style.backgroundColor = "red";
    }else{
        book.hasRead = true;
        updateButton.textContent = "Read";
        updateButton.style.backgroundColor = "green";
    }
  });
  librarySection.appendChild(newBookHtml);
}

function addBookToLibrary(bookName, bookAuthor, bookPages, hasReadBook){
    let newId = crypto.randomUUID();
    let newBook = new Book(bookName, bookAuthor, bookPages, hasReadBook, newId);
    myLibrary.push(newBook);
    addBookToHtml(newBook);
}


const openBtn = document.querySelector(".add-book");
const closeBtn = document.querySelector(".submit");
const modal = document.querySelector(".overlay");
const form = document.querySelector(".book-form");

openBtn.addEventListener("click", ()=>{
    modal.style.display = "flex";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  let bookName = document.querySelector("#bookTitle").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  let hasReadBook = document.querySelector("#hasRead").checked;
  console.log(hasReadBook);
  addBookToLibrary(bookName, bookAuthor, bookPages, hasReadBook);
  modal.style.display = "none";
  form.reset();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});