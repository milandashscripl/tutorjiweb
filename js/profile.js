// 🚀------------------- LOAD USER PROFILE ON PAGE LOAD -------------------🚀
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 🔑 Retrieve stored authentication details
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert('User not authenticated. Please log in.');
      return;
    }

    // 🌐 Fetch user profile from backend
    const response = await fetch(`https://tutorji.onrender.com/api/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile data!');
    }

    const { profilePicture, name, email, contact, aadhar, address } = await response.json();

    // 📝 Populate user profile fields
    const profileFields = {
      profilePicture: profilePicture || 'default-profile.png', // Fallback if no profile picture
      name,
      email,
      contact,
      aadhar,
      address,
    };

    Object.entries(profileFields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.tagName === 'IMG' ? (element.src = value) : (element.textContent = value || 'N/A');
      }
    });

  } catch (error) {
    console.error('Profile Fetch Error:', error);
    alert('An error occurred while fetching profile data. Please try again.');
  }
});
