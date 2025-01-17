document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
  
    const response = await fetch(`https://tutorji.onrender.com/api/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (response.ok) {
      const user = await response.json();
      document.getElementById('profilePicture').src = user.profilePicture;
      document.getElementById('name').textContent = user.name;
      document.getElementById('email').textContent = user.email;
      document.getElementById('contact').textContent = user.contact;
      document.getElementById('aadhar').textContent = user.aadhar;
      document.getElementById('address').textContent = user.address;
    } else {
      alert('Failed to fetch profile data!');
    }
  });
  