
// Get all the "View Comments" buttons and add click event listeners
const viewCommentBtns = document.querySelectorAll(".reveal-comments");
const hiddenEle = document.querySelector("#user-name");
const userName = hiddenEle.getAttribute("data-name")


let currentDay = dayjs();
 let date = currentDay.format("dddd, MMM DD");

// function nameChecker() {
//   const dataName = document.querySelector("#user-name");
//   if (dataName) {
//     const userName = dataName.getAttribute("data-name");
//     return userName;
//   } else {
//     return "";
//   }
// }

viewCommentBtns.forEach((viewCommentBtn, index) => {
  viewCommentBtn.addEventListener("click", () => {
    // Increment the index by 1 to start from 1 instead of 0
    const buttonNumber = index + 1;

    // Find the hidden container associated with the clicked button
    const blogPost = viewCommentBtn.closest(".blogpost");
    const reveal = blogPost.querySelector(".hidden-container");

    // Toggle the "open" class to show/hide the container
    reveal.classList.toggle("open");

    // Display the button number in an alert
    // alert(`Clicked number ${buttonNumber}`);
  });
});

// Get all the "Add Comment" buttons and add click event listeners
const addCommentBtns = document.querySelectorAll(".add-comment");

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

    commentContainer.appendChild(commentInput);
    commentContainer.appendChild(commentSubmit);

    commentSubmit.addEventListener("click", () => {
      const commentText = commentInput.value;
      if (commentText.trim() !== "") {
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
            commentTextElement.textContent = `${data.description} created by ${userName} on ${date}}`;
            commentTextElement.style.color = "aqua";
            commentContainer.appendChild(commentTextElement);
          })
          .catch((error) => {
            console.error("Error submitting comment:", error);
          });

        commentInput.value = "";
        commentInput.remove();
        commentSubmit.remove();
      }
    });

  });
});
