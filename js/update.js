document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('contact', document.getElementById('contact').value);
    formData.append('aadhar', document.getElementById('aadhar').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('profilePicture', document.getElementById('profilePicture').files[0]);
  
    const response = await fetch('https://tutorji.onrender.com/api/users/:id', {
      method: 'PATCH',
      body: formData,
    });
  
    if (response.ok) {
      alert('Registration successful! You can now log in.');
      window.location.href = 'index.html';
    } else {
      alert('Registration failed!');
    }
  });
  