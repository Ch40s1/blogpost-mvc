
// Get all the "View Comments" buttons and add click event listeners
const viewCommentBtns = document.querySelectorAll(".reveal-comments");

// gets the hidden element when logged in.
const hiddenEle = document.querySelector("#user-name");
const userName = hiddenEle.getAttribute("data-name")

// uses day js library to create the date
let currentDay = dayjs();
let date = currentDay.format("dddd, MMM DD");

//  assigns a event listener to each btn
viewCommentBtns.forEach((viewCommentBtn, index) => {
  viewCommentBtn.addEventListener("click", () => {

    // Find the hidden container associated with the clicked button
    const blogPost = viewCommentBtn.closest(".blogpost");
    const reveal = blogPost.querySelector(".hidden-container");

    // Toggle the "open" class to show/hide the container
    reveal.classList.toggle("open");
  });
});

// Get all the "Add Comment" buttons and add click event listeners
const addCommentBtns = document.querySelectorAll(".add-comment");

// for each comment btn add an event listener
addCommentBtns.forEach((addCommentBtn) => {
  addCommentBtn.addEventListener("click", () => {

    const blogpostId = addCommentBtn.getAttribute("data-blogpost-id");

    // Find the hidden container associated with the clicked button
    const blogPost = addCommentBtn.closest(".blogpost");
    const commentContainer = blogPost.querySelector(".comment-container");

    const commentInput = document.createElement("textarea");
    commentInput.setAttribute("placeholder", "Type your comment here");
    const commentSubmit = document.createElement("button");
    commentSubmit.textContent = "Submit";

    // append the created elements
    commentContainer.appendChild(commentInput);
    commentContainer.appendChild(commentSubmit);

    commentSubmit.addEventListener("click", () => {
      const commentText = commentInput.value;
      // deletes extra space
      if (commentText.trim() !== "") {
        // crates a post to the api
        fetch("/api/blogposts/comments", {
          method: "POST",
          body: JSON.stringify({
            description: commentText, blogpostId,
          }),

          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Access the "text" property of the response object
            const commentTextElement = document.createElement("p");
            // sets the text content to have the user name and date
            commentTextElement.textContent = `${data.description} created by ${userName} on ${date}}`;
            commentTextElement.style.color = "aqua";
            commentContainer.appendChild(commentTextElement);
          })
          .catch((error) => {
            console.error("Error submitting comment:", error);
          });


        // deletes the removes the fields when done submitting
        commentInput.value = "";
        commentInput.remove();
        commentSubmit.remove();
      }
    });

  });
});
