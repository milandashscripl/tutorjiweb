// 🚀------------------- USER REGISTRATION HANDLER -------------------🚀
document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page refresh on form submission

  try {
    // 📝 Collect form inputs
    const formData = new FormData();
    const fields = ['name', 'email', 'contact', 'aadhar', 'address', 'password', 'campusName', 'seatNumber', 'position'];
    
    fields.forEach((field) => {
      const value = document.getElementById(field)?.value;
      if (value) formData.append(field, value);
    });

    const profilePicture = document.getElementById('profilePicture')?.files[0];
    if (profilePicture) formData.append('profilePicture', profilePicture);

    // 🌐 Send registration request
    const response = await fetch('https://tutorji.onrender.com/api/users/register', {
      method: 'POST',
      body: formData,
    });

    // ✅ Handle response
    if (response.ok) {
      alert('🎉 Registration successful! Redirecting to login...');
      window.location.href = 'index.html'; // Redirect to login page
    } else {
      const errorData = await response.json();
      alert(`❌ Registration failed: ${errorData.error || 'Please try again.'}`);
    }
  } catch (error) {
    console.error('Registration Error:', error);
    alert('🚫 An error occurred during registration. Please try again.');
  }
});
