// Logic for navigating to the edit post page
function editPost(index) {
    window.location.href = `/edit-post/${index}`;
}

// Event listener for the form submission
document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/create-post', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(post => {
            window.location.reload();
        })
});