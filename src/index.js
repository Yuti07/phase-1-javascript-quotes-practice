const quoteList = document.getElementById('quote-list');

// Fetch quotes
fetch('http://localhost:3000/quotes?_embed=likes')
  .then(response => response.json())
  .then(quotes => {
    quotes.forEach(quote => {
      renderQuote(quote);
    });
  });
  function renderQuote(quote) {
    const li = document.createElement('li');
    li.className = 'quote-card';

    li.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    `;

    const deleteButton = li.querySelector('.btn-danger');
    deleteButton.addEventListener('click', () => {
      deleteQuote(quote.id);
      li.remove();
    });

    const likeButton = li.querySelector('.btn-success');
    likeButton.addEventListener('click', () => {
      createLike(quote.id, quote.likes.length, likeButton);
    });

    quoteList.appendChild(li);
  }
  const quoteForm = document.querySelector('form');

  quoteForm.addEventListener('submit', event => {
    event.preventDefault();

    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');

    const newQuote = {
      quote: quoteInput.value,
      author: authorInput.value
    };

    // Create quote
    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    })
    .then(response => response.json())
    .then(quote => {
      renderQuote(quote);
      quoteInput.value = '';
      authorInput.value = '';
    });
  });
  function createLike(quoteId, likeCount, likeButton) {
    const newLike = {
      quoteId: parseInt(quoteId)
    };

    // Create like
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLike)
    })
    .then(response => response.json())
    .then(like => {
      likeButton.innerHTML = `Likes: <span>${likeCount + 1}</span>`;
    });
  }
