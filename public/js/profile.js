// Create a function to handle form submission
const createBlogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value.trim();
  const name = document.querySelector('#project-author').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (title && name && description) {
    try {
      const response = await fetch('/api/blogposts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          name,
          description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Created Post')
        document.location.replace('/profile');
      } else {
        alert('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('An error occurred while creating the blog post');
    }
  }
};

// deletes the blogpost
const deleteHandler = async (event) =>{
  if(event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');
    // creates a delete method
    const response = await fetch(`/api/blogposts/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
}

// Add a submit event listener to the form
document
  .querySelector('.new-project-form')
  .addEventListener('submit', createBlogPostHandler);

  document.querySelector('#delete-btn').addEventListener('click', deleteHandler)
