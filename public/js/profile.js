document.addEventListener('DOMContentLoaded', () => {

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

const deleteHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    // creates a delete method
    try {
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the delete was successful, remove the corresponding post from the DOM
        const postToDelete = document.querySelector(`.blogpost[data-id="${id}"]`);
        if (postToDelete) {
          postToDelete.remove();
        }

        alert('Deleted Post');
        document.location.replace('/profile');
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('An error occurred while deleting the blog post');
    }
  }
};

function showUpdateForm(event) {
  const postId = event.target.getAttribute('data-id');
  const updateForm = document.querySelector(`.update-form[data-id="${postId}"]`);
  updateForm.classList.toggle("open");
}

async function updateBlogPostHandler(event) {
  event.preventDefault();

  const postId = event.target.querySelector('.update-post-id').value.trim();
  const updatedTitle = event.target.querySelector('.update-project-name').value.trim();
  const updatedDescription = event.target.querySelector('.update-project-desc').value.trim();

  if (postId && updatedTitle && updatedDescription) {
    try {
      const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Updated Post');
        document.location.replace('/profile');
      } else {
        alert('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('An error occurred while updating the blog post');
    }
  }
}

// Add a submit event listener to the form
document
  .querySelector('.new-project-form')
  .addEventListener('submit', createBlogPostHandler);

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteHandler);
  });
  document.querySelectorAll('.update-btn').forEach(button => {
    button.addEventListener('click', showUpdateForm);
  });
  document.querySelectorAll('.update-project-form').forEach(form => {
    form.addEventListener('submit', updateBlogPostHandler);
  });

});
