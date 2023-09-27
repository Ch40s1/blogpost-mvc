const viewComment = document.getElementById('reveal-comments')
const reveal = document.querySelector('.hidden-container')
const addComment = document.getElementById('add-comment');
const commentContainer = document.getElementById('comment-container');

//  I wanted to make it so that when it selects each button


viewComment.addEventListener('click', function () {
  reveal.classList.toggle("open");
});
addComment.addEventListener('click', ()=>{
  const commentInput = document.createElement('textarea');
  commentInput.setAttribute('placeholder', 'Type your comment here');
  const commentSubmit = document.createElement('button');
  commentSubmit.textContent = 'Submit';

  commentSubmit.addEventListener('click', () => {
    const commentText = commentInput.value;
    if (commentText.trim() !== '') {
      const commentTextElement = document.createElement('p');
      commentTextElement.textContent = commentText;
      commentContainer.appendChild(commentTextElement);
      commentInput.value = '';
      commentInput.remove();
      commentSubmit.remove();
    }
  });

  commentContainer.appendChild(commentInput);
  commentContainer.appendChild(commentSubmit);
  // commentContainer.appendChild(newComment);
});
