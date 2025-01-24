document.addEventListener('DOMContentLoaded', async () => {
  const updateForm = document.getElementById('updateProfileForm');
  const userId = localStorage.getItem('userId'); // Replace with logic to fetch the user ID dynamically.

  // Pre-fill form fields with existing user data
  try {
    const response = await fetch(`/api/users/profile/${userId}`);
    if (response.ok) {
      const user = await response.json();

      // Populate form fields with existing user data
      updateForm.name.value = user.name || '';
      updateForm.email.value = user.email || '';
      updateForm.contact.value = user.contact || '';
      updateForm.aadhar.value = user.aadhar || '';
      updateForm.address.value = user.address || '';
      // updateForm.role.value = user.role || 'user';

      // Optionally display the current profile picture
      if (user.profilePicture) {
        const profileImg = document.createElement('img');
        profileImg.src = user.profilePicture; // Assuming URL is already public-facing or served.
        profileImg.alt = 'Profile Picture';
        profileImg.style.width = '100px';
        profileImg.style.height = '100px';
        updateForm.insertBefore(profileImg, updateForm.firstChild);
      }
    } else {
      alert('Failed to load user data.');
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
  }

  // Handle form submission for profile update
  updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(updateForm);

    try {
      const response = await fetch(`https://tutorji.onrender.com/api/users/update/${userId}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Profile updated successfully!');
        console.log('Updated user:', data.user);

        // Optionally redirect or reload
        window.location.href = '/profile.html';
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('An unexpected error occurred.');
    }
  });
});
