const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};



interface Store {
  cartItems: Array<Book>;
  books: Array<Book>;
  storeData();
  getData();
  toggle();
  // storeCartData();
  // getCartData();
  addBook(
    title: string,
    author: string,
    genre: "scienceF" | "detective" | "prose" | "adventures" | "children",
    year: number,
    rank: number,
    price: number,
    img: any,
    id: string
  );
  deleteBook(title: string);
  updateBook(genre: string, title: string, price: number, id: string);
  deleteByID(id: string);
  addToCart(id: string);
  sortAscenByAuthor();
  sortDescenByAuthor();
  sortAscenByRanking();
  sortDescenByRanking();
  sortAscenByYear();
  sortDescenByYear();
  filterByYear(year: number);
  filterByRank(rank: number);
  filterByGenre(genre: string);
  filterByAuthor(author: string);
  filterByTitle(title: string);
  render(list: any, domElement: any);
  renderERP(list: any, domElement: any);
  // renderAddToCart(list: any, domElement);
  renderAllBooks(domElement: any);
  renderFilterByYear(filteredByYear: Array<Book>, domElement);
  renderFilterByRank(filteredByRank: Array<Book>, domElement);
  renderFilterByGenre(filteredByGenre: Array<Book>, domElement);
  renderFilterByAuthor(filteredByAuthor: Array<Book>, domElement);
  renderFilterByTitle(filteredByTitle: Array<Book>, domElement);
  renderaddItemsCartNum(rootCartNum);
  renderItemsCart(list, rootItemsStoreCart);
  deleteItemCart(id);
  addItemsCart(Book);
}

interface Book {
  id?: string;
  // selectItem: string;
  title: string;
  author: string;
  genre: "scienceF" | "detective" | "prose" | "adventures" | "children";
  year: number;
  rank: number;
  price: number;
  img: any;
}

const StandartEbooks = {
  cartItems: [],
  books: [
    {
      title: "The Three-Body Problem",
      author: "Liu Cixin",
      genre: "scienceF",
      year: 2008,
      rank: 4.07,
      price: 15,
      img: "https://images-na.ssl-images-amazon.com/images/I/919XM42JQlL.jpg",
      id: uid(),
    },
    {
      title: "One by One",
      author: "Carter Chris",
      genre: "detective",
      year: 2013,
      rank: 9.83,
      price: 28,
      img: "https://litlife.club/data/Book/0/217000/217759/BC3_1410688094.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "Fight Club",
      author: "Palahniuk Chuck",
      genre: "prose",
      year: 2009,
      rank: 9.63,
      price: 17,
      img: "https://litlife.club/data/Book/0/87000/87828/BC3_1474544490.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "Ramage",
      author: "Pope Dudley",
      genre: "adventures",
      year: 2010,
      rank: 10.0,
      price: 34,
      img: "https://litlife.club/data/Book/0/119000/119128/BCS_1349028836.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "Grimms` Fairy Tales",
      author: "Davenport Jennie",
      genre: "children",
      year: 1994,
      rank: 9.5,
      price: 32,
      img: "https://litlife.club/data/Book/0/0/707/BC3_1386593820.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "The Caller",
      author: "Carter Chris",
      genre: "detective",
      year: 2017,
      rank: 9.59,
      price: 44,
      img: "https://images-na.ssl-images-amazon.com/images/I/81-7W7KGYQL.jpg",
      id: uid(),
    },

    {
      title: "Revelation",
      author: "Karpyshyn Drew",
      genre: "scienceF",
      year: 2010,
      rank: 7.8,
      price: 21,
      img: "https://litlife.club/data/Book/0/91000/91909/BCS_1349020826.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "Deception Point",
      author: "Brown Dan",
      genre: "detective",
      year: 2010,
      rank: 9.99,
      price: 39,
      img: "https://litlife.club/data/Book/0/125000/125823/BCS_1349021980.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "The Secret History",
      author: "Tartt Donna",
      genre: "prose",
      year: 2011,
      rank: 9.89,
      price: 41,
      img: "https://litlife.club/data/Book/0/94000/94365/BC3_1474425076.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "Hornblower and the Crisis",
      author: "Forester Cecil Scott",
      genre: "adventures",
      year: 1990,
      rank: 0.23,
      price: 10,
      img: "https://litlife.club/data/Book/0/126000/126284/BCS_1349022091.jpg?w=600&h=600&q=90",
      id: uid(),
    },
    {
      title: "The Adventures of Huckleberry Finn",
      author: "Twain Mark",
      genre: "children",
      year: 1981,
      rank: 10.0,
      price: 43,
      img: "https://litlife.club/data/Book/0/0/755/BC3_1386593870.jpg?w=600&h=600&q=90",
      id: uid(),
    },
  ],

  addItemsCart(Book) {
    this.cartItems.push(Book);
  },

  addItemsCartNum(cartCount) {
    cartCount = this.cartItems.length;
  },

  deleteItemCart(id) {
    this.cartItems = this.cartItems.filter((book) => book.id !== id);
  },

  storeData() {
    localStorage.setItem("storeData", JSON.stringify(this.books));
  },

  getData() {
    const booksStorage = JSON.parse(localStorage.getItem("storeData"));
    if (booksStorage) {
      this.books = booksStorage;
    }
  },

  addBook(title, author, genre, year, rank, price, img, annotation) {
    const id = uid();
    this.books.push({
      title,
      author,
      genre,
      year,
      rank,
      price,
      img,
      id,
    });
    this.storeData();
  },

  deleteBook(title) {
    const index = this.books.findIndex((book) => book.title === title);
    if (index >= 0) {
      this.books.splice(index, 1);
    }
    this.storeData();
  },

  deleteByID(id) {
    this.books = this.books.filter((book) => book.id !== id);
    localStorage.setItem("storeData", JSON.stringify(this.books));
  },

  updateBook(id, genre, title, price) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index >= 0) {
      this.books[index].genre = genre;
      this.books[index].title = title;
      this.books[index].price = price;
    }
    this.storeData();
  },

  sortAscenByAuthor() {
    this.books = this.books.sort((a, b) => {
      let authorA = a.author.toLowerCase(),
        authorB = b.author.toLowerCase();
      if (authorA < authorB) return -1;
      if (authorA > authorB) return 1;
      return 0;
    });
    this.books.forEach((book) => {
      console.log(book.author);
    });
  },

  sortDescenByAuthor() {
    this.books = this.books.sort((a, b) => {
      let authorA = a.author.toLowerCase(),
        authorB = b.author.toLowerCase();
      if (authorA < authorB) return 1;
      if (authorA > authorB) return -1;
      return 0;
    });
    console.log("------");
    this.books.forEach((book) => {
      console.log(book.author);
    });
  },

  sortAscenByYear() {
    this.books = this.books.sort((a, b) => {
      return a.year - b.year;
    });
  },

  sortDescenByYear() {
    this.books = this.books.sort((a, b) => {
      return b.year - a.year;
    });
  },

  sortAscenByRanking() {
    this.books = this.books.sort((a, b) => {
      return a.rank - b.rank;
    });
  },

  sortDescenByRanking() {
    this.books = this.books.sort((a, b) => {
      return b.rank - a.rank;
    });
  },

  filterByYear(year) {
    return this.books.filter((book) => book.year <= year);
  },

  filterByRank(rank) {
    return this.books.filter((book) => book.rank <= rank);
  },

  filterByGenre(genre) {
    return this.books.filter((book) => book.genre === genre);
  },

  filterByAuthor(author) {
    return this.books.filter((book) => book.author === author);
  },

  filterByTitle(title) {
    return this.books.filter((book) => book.title === title);
  },

  renderFilterByTitle(filteredByTitle, domElement) {
    this.render(filteredByTitle, domElement);
  },

  renderFilterByAuthor(filteredByAuthor, domElement) {
    this.render(filteredByAuthor, domElement);
  },

  renderFilterByGenre(filteredByGenre, domElement) {
    this.render(filteredByGenre, domElement);
  },

  renderFilterByRank(filteredByRank, domElement) {
    this.render(filteredByRank, domElement);
  },

  renderFilterByYear(filteredByYear, domElement) {
    this.render(filteredByYear, domElement);
  },

  renderERP(list, domElement) {
    let html = " ";
    list.forEach((book: any) => {
      html += `<div class="containerERP__content">
      
                  <div class='containerERP__content__cartERP'> 

                      <div class='containerERP__content__cartERP__img'> 
                         <img src="${book.img}.jpg" alt="">  
                      </div> 
                      
                       <div class='containerERP__content__cartERP__info'>  
                             <strong class="title">${book.title}</strong>                                
                             <strong class="author">${book.author}</strong>
                             <strong class="genre">${book.genre}</strong>
                             <strong class="year">${book.year}</strong>
                             <strong class="rank">${book.rank}</strong>             
                        </div> 
                  </div>
                   <div class="containerERP__content__erpBtn">      
                         <div class="content__erpBtn__delete" style= "margin-bottom: 1em;" >
                               <button class="containerERP__inputs__form__one__inp"  onclick="handleDeleteByID('${book.id}')"><span style ="color: grey; cursor: pointer;" >Delete book</span></button>
                         </div> 
                       
                         <div class="content__erpBtn__update">
                             <form id="formAdd" onsubmit="handleUpdateBook(event, '${book.id}')">
                                  <select class="containerERP__inputs__form__one__inp" name="genre" id=""  style="cursor: pointer;" >
                                      <option value="genre" disabled selected>genre</option>
                                      <option value="scienceF">scienceF</option>
                                      <option value="detective">detective</option>
                                      <option value="prose">prose</option>
                                      <option value="adventures">adventures</option>
                                      <option value="children">children</option>
                                   </select>  
                                 <input class="containerERP__inputs__form__one__inp"  type="text" name="title" placeholder="Edit title" value="${book.title}">
                                 <input class="containerERP__inputs__form__one__inp"  type="number" name="price"  id="price" placeholder="Edit price" value="${book.price}">
                                 <input class="containerERP__inputs__form__one__inp"  type="submit" id="update" value="Update book" style="cursor: pointer;" >
                             </form>
                         </div> 
                    </div>          
               </div>`;
    });

    domElement.innerHTML = html;
  },

  render(list, domElement) {
    let htmlStore = "";
    list.forEach((book: any) => {
      htmlStore += `<div class="cart">
                  <h2  class="bookTitle" >${book.title}</h2>
                  <h3>${book.author}</h3>      
                  <img class="img" src="${book.img}">
                  <p class="price" >${book.year} &nbsp &nbsp ${book.price}$</p>
                  <div class="rating">                 
                      <i class="far fa-star" data-number="1" id="${book.id}" onclick = "handleStarClick(event)"></i>
                      <i class="far fa-star" data-number="2" id="${book.id}" onclick = "handleStarClick(event)"></i>
                      <i class="far fa-star" data-number="3" id="${book.id}" onclick = "handleStarClick(event)"></i>
                      <i class="far fa-star" data-number="4" id="${book.id}" onclick = "handleStarClick(event)"></i>
                      <i class="far fa-star" data-number="5" id="${book.id}" onclick = "handleStarClick(event)"></i>
                   </div>                        
                  <p> ${book.rank}</p>
                  <input  type ="button" class = "cart__addToCartBtn" onclick="handleaddItemsCart(event, '${book.id}')"  value = "Add to cart">              
                             
               </div>`;
    });

    domElement.innerHTML = htmlStore;
  },

  renderItemsCart(list, rootItemsStoreCart) {
    let htmlCart = "";
    list.forEach((book) => {
      htmlCart += `<div class="sortPopUpBag">
            <div class="imgCart">
            <div class="main__item pic${book.img}"></div>
            </div>
            <div class="title">${book.title}</div>
            <div class="price">${book.price}</div>
            <div class="delete">
            <div class="deleteCartItem"><button onclick="handleDeleteCart('${book.id}')">
            <i class="far fa-trash-alt" aria-hidden="true"></i></button></div>
            </div>
            </div>
            <hr>`;
    });

    rootItemsStoreCart.innerHTML = htmlCart;
  },

  renderaddItemsCartNum(rootCartNum) {
    rootCartNum.innerHTML = "";
    let htmlCartCount = `${this.cartItems.length}`;
    rootCartNum.innerHTML = htmlCartCount;
  },
};



function handleaddItemsCart(ev, id) {
  try {
    let id = uid();
    const cartCount = "";
    const cartItem = StandartEbooks.books.filter((book) => book.id == id)[0];
    StandartEbooks.addItemsCart(cartItem);
    const rootItemsStoreCart = document.querySelector("#rootItemsStoreCart");
    StandartEbooks.renderItemsCart(StandartEbooks.cartItems, rootItemsStoreCart);

    StandartEbooks.addItemsCartNum(cartCount);
    const rootCartNum = document.querySelector("#cartNum");
    StandartEbooks.renderaddItemsCartNum(rootCartNum);

    if (!rootItemsStoreCart) throw new Error('no "rootItemsStoreCart" in DOM');
    if (!rootCartNum) throw new Error('no "cartNum" in DOM');
  } catch (error) {
    console.error(error);
  }
}

function handleDeleteCart(id) {
  try {
    let id = uid();
    const rootItemsStoreCart = document.querySelector("#rootItemsStoreCart");
    StandartEbooks.deleteItemCart(id);
    StandartEbooks.renderItemsCart(StandartEbooks.cartItems, rootItemsStoreCart);
    const cartCount = "";
    StandartEbooks.addItemsCartNum(cartCount);
    const rootCartNum = document.querySelector("#cartNum");
    StandartEbooks.renderaddItemsCartNum(rootCartNum);
    const popup = document.querySelector("#myPopupBag");
    popup.classList.toggle("show");

    if (!rootItemsStoreCart) throw new Error('no "rootItemsStoreCart" in DOM');
    if (!popup) throw new Error('no "myPopupBag" in DOM');
  } catch (error) {
    console.error(error);
  }
}



function myFunctionBag() {
  try {
    const popup = document.querySelector("#myPopupBag");
    popup.classList.toggle("show");

    if (!popup) throw new Error('no "myPopupBag" in DOM');
  } catch (error) {
    console.error(error);
  }
}







StandartEbooks.getData();
StandartEbooks.storeData();
// StandartEbooks.storeCartData();
// StandartEbooks.getCartData();

function renderOwener() {
  try {
    StandartEbooks.getData();
    const rootERP = document.querySelector("#rootERP");
    StandartEbooks.renderERP(StandartEbooks.books, rootERP);
  } catch (err) {
    console.error(err);
  }
}

function renderCustomer() {
  try {
    StandartEbooks.getData();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}





function handleAddBook(e) {
  try {
    // debugger;
    e.preventDefault();
    let id = uid();
    console.log(e.target);
    const title = e.target.title.value;
    const author = e.target.author.value;
    const genre = e.target.genre.value;
    const year = e.target.year.valueAsNumber;
    const rank = e.target.rank.valueAsNumber;
    const price = e.target.price.valueAsNumber;
    const img = e.target.img.value;
    const annotation = e.target.annotation.value;
    const rootERP = document.querySelector("#rootERP");
    StandartEbooks.addBook(
      title,
      author,
      genre,
      year,
      rank,
      price,
      img,
      annotation
    );
    StandartEbooks.render(StandartEbooks.books, rootERP);
    StandartEbooks.storeData();

    if(typeof title !== "string") throw new Error('input should be of type string');

    e.target.reset();
  } catch (err) {
    console.error(err);
  }
}

function handleDeleteBook(e) {
  e.preventDefault();
  try {
    console.log(e);
    console.log(e.target.elements.delete.value);
    const title = e.target.elements.delete.value;
    const rootERP = document.querySelector("#rootERP");

    if(typeof title !== "string") throw new Error('input should be of type string');

    if (title) {
      console.log(title);

      StandartEbooks.deleteBook(title);
      StandartEbooks.renderERP(StandartEbooks.books, rootERP);
      StandartEbooks.storeData();
    } else {
      throw new Error("User didnt write a title");
    }
  } catch (err) {
    console.error(err);
  }
}

function handleDeleteByID(id) {
  try {
    console.log(id);
    const rootERP = document.querySelector("#rootERP");
    StandartEbooks.deleteByID(id);
    StandartEbooks.renderERP(StandartEbooks.books, rootERP);

    if(typeof id !== id) throw new Error('you have no id');

  } catch (err) {
    console.error(err);
  }
}

function handleUpdateBook(e, id) {
  try {
    e.preventDefault();
    console.log(id);
    const genre = e.target.genre.value;
    const title = e.target.elements.title.value;
    const price = e.target.elements.price.valueAsNumber;
    const rootERP = document.querySelector("#rootERP");
    StandartEbooks.updateBook(id, genre, title, price);
    StandartEbooks.renderERP(StandartEbooks.books, rootERP);
    StandartEbooks.storeData();
    e.target.reset();

    if(typeof genre !== "string") throw new Error('input should be of type string');
    if(typeof price !== "number") throw new Error('input should be of type number');

  } catch (err) {
    console.error(err);
  }
}

function handleAuthorAscen() {
  try {
    StandartEbooks.sortAscenByAuthor();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}

function handleAuthoreDescen() {
  try {
    StandartEbooks.sortDescenByAuthor();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}

function handleYearAscen() {
  try {
    StandartEbooks.sortAscenByYear();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}

function handleYearDescen() {
  try {
    StandartEbooks.sortDescenByYear();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}

function handleRankingAscen() {
  try {
    StandartEbooks.sortAscenByRanking();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}

function handleRankingeDescen() {
  try {
    StandartEbooks.sortDescenByRanking();
    const root = document.querySelector("#root");
    StandartEbooks.render(StandartEbooks.books, root);
  } catch (err) {
    console.error(err);
  }
}

function handleFilterByYear(e) {
  try {
    e.preventDefault();
    const year = e.target.valueAsNumber;
    const root = document.querySelector("#root");

    if(typeof year !== "number") throw new Error('input should be of type number');

    if (year) {
      const filteredByYear = StandartEbooks.filterByYear(year);
      StandartEbooks.renderFilterByYear(filteredByYear, root);
    } else {
      StandartEbooks.render(StandartEbooks.books, root);
    }
  } catch (err) {
    console.error(err);
  }
}

function handleFilterByRank(e) {
  try {
    e.preventDefault();
    const rank = e.target.valueAsNumber;
    const root = document.querySelector("#root");

    if(typeof rank !== "number") throw new Error('input should be of type number');

    if (rank) {
      const filteredByRank = StandartEbooks.filterByRank(rank);
      StandartEbooks.renderFilterByRank(filteredByRank, root);
    } else {
      StandartEbooks.render(StandartEbooks.books, root);
    }
  } catch (err) {
    console.error(err);
  }
}


function handleSelectByGenre(e) {
  try {
    e.preventDefault();
    console.log(e.target);
    console.log(e);
    // debugger;
    const genre = e.target.id;
    const root = document.querySelector("#root");

    if(typeof genre !== "string") throw new Error('input should be of type string');

    if (genre === "all") {
      StandartEbooks.render(StandartEbooks.books, root);
    } else {
      console.log(genre);
      const filterByGenre = StandartEbooks.filterByGenre(genre);
      const a = StandartEbooks.books.filter((item) => {
        return item.genre === genre;
      });
      // console.log("ghgjg..........", filterByGenre, genre, a);
      StandartEbooks.renderFilterByGenre(filterByGenre, root);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleFilterByAuthor(e) {
  try {
    e.preventDefault();
    const author = e.target.value;
    const root = document.querySelector("#root");

    if(typeof author !== "string") throw new Error('input should be of type string');

    if (author) {
      const filterByAuthor = StandartEbooks.filterByAuthor(author);
      StandartEbooks.renderFilterByAuthor(filterByAuthor, root);
    } else {
      StandartEbooks.render(StandartEbooks.books, root);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleFilterByTitle(e) {
  try {
    e.preventDefault();
    const title = e.target.value;
    const root = document.querySelector("#root");

    if(typeof title !== "string") throw new Error('input should be of type string');

    if (title) {
      const filterByTitle = StandartEbooks.filterByTitle(title);
      StandartEbooks.renderFilterByTitle(filterByTitle, root);
    } else {
      StandartEbooks.render(StandartEbooks.books, root);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleSearchBook(e) {
  try {
    e.preventDefault();
    const author = e.target.value;
    const title = e.target.value;
    const search = e.target.value;
    const regex = new RegExp(search, "i");
    const root: any = document.querySelector("#root");
    root.innerHTML = "";

    if(typeof search !== "string") throw new Error('input should be of type string');

    if (search.length > 0) {
      const foundBook = StandartEbooks.books.filter((book) => {
        if (regex.test(book.title) || regex.test(book.author)) return true;

        const filterByTitle = StandartEbooks.filterByTitle(title);
        const filterByAuthor = StandartEbooks.filterByAuthor(author);
        StandartEbooks.renderFilterByTitle(filterByTitle, root);
        StandartEbooks.renderFilterByAuthor(filterByAuthor, root);
      });

      const html = foundBook
        .map((book) => {
          return `<p>${book.title}</p>
                <p>${book.author}</p>`;
        })
        .join("");

      root.innerHTML = html;
      console.log(foundBook);
    } else {
      StandartEbooks.render(StandartEbooks.books, root);
    }
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
}

const scrollToTopBtn = document.querySelector("#scrollToTopBtn");
const rootElement = document.documentElement;
function handleScroll() {
  try {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.8) {
      scrollToTopBtn.classList.add("showBtn");
    } else {
      scrollToTopBtn.classList.remove("showBtn");
    }
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
}
function scrollToTop() {
  try {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);



const root = document.querySelector("#root");
const rootERP = document.querySelector("#rootERP");
// const rootCart = document.querySelector("#rootCart");

StandartEbooks.getData();
StandartEbooks.storeData();
// StandartEbooks.storeCartData();
// StandartEbooks.getCartData();





