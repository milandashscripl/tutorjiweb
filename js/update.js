document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    alert('User not authenticated. Please log in.');
    window.location.href = 'index.html';
    return;
  }

  // 🌟 Fetch and Populate Existing User Data
  try {
    const response = await fetch(`https://tutorji.onrender.com/api/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch profile data.');

    const user = await response.json();

    document.getElementById('profilePictureImg').src = user.profilePicture || 'default-avatar.png';
    document.getElementById('name').value = user.name || '';
    document.getElementById('contact').value = user.contact || '';
    document.getElementById('aadhar').value = user.aadhar || '';
    document.getElementById('address').value = user.address || '';
  } catch (err) {
    console.error('Fetch Error:', err);
    alert('Error loading profile. Please refresh or try again later.');
  }

  // 📝 Handle Profile Update Submission
  document.getElementById('updateProfileForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value.trim());
    formData.append('contact', document.getElementById('contact').value.trim());
    formData.append('aadhar', document.getElementById('aadhar').value.trim());
    formData.append('address', document.getElementById('address').value.trim());

    const profilePicture = document.getElementById('profilePicture').files[0];
    if (profilePicture) formData.append('profilePicture', profilePicture);

    try {
      const updateResponse = await fetch(`https://tutorji.onrender.com/api/users/update/${userId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || 'Profile update failed.');
      }

      alert('✅ Profile updated successfully!');
      window.location.href = '/profile.html';
    } catch (err) {
      console.error('Update Error:', err);
      alert(`⚠️ Error: ${err.message}`);
    }
  });
});
