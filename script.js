document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const overlayLoginBtn = document.getElementById('overlay-login-btn');
  const overlaySignupBtn = document.getElementById('overlay-signup-btn');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  // --- 1. Overlay / Panel Toggle (Sign In vs Sign Up) ---
  if (overlaySignupBtn) {
    overlaySignupBtn.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
  }

  if (overlayLoginBtn) {
    overlayLoginBtn.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  // Mobile View Switchers
  if (switchToSignup) {
    switchToSignup.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  // --- 2. Role Switching (Student vs Hostel / Owner) ---
  const rolePills = document.querySelectorAll('.role-pill');

  rolePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const selectedRole = e.target.getAttribute('data-role');
      const formPanel = e.target.closest('.form-panel');

      // Update role pills active state within the current panel
      formPanel.querySelectorAll('.role-pill').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      // Set data attribute on the container/panel to filter fields via CSS/JS
      formPanel.setAttribute('data-role', selectedRole);
    });
  });

  // --- 3. Login Method Switcher (Password vs OTP) ---
  const methodPills = document.querySelectorAll('.method-pill');

  methodPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const selectedMethod = e.target.getAttribute('data-login');
      const formPanel = e.target.closest('.form-panel');

      // Update method pills active state within the panel
      formPanel.querySelectorAll('.method-pill').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      // Set data attribute on panel to toggle Password / OTP fields
      formPanel.setAttribute('data-login', selectedMethod);
    });
  });

  // --- 4. Password Toggle (Show/Hide) ---
  const toggleEyeButtons = document.querySelectorAll('.toggle-eye');

  toggleEyeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const passwordInput = button.parentElement.querySelector('input');
      if (passwordInput) {
        const currentType = passwordInput.getAttribute('type');
        passwordInput.setAttribute('type', currentType === 'password' ? 'text' : 'password');
      }
    });
  });

  // --- 5. Redirect to home page after Create Account / Log in ---
  // NOTE: this is a placeholder — once the backend (Supabase) is wired up,
  // this should only redirect after a successful signup/login response.
  const signUpForm = document.querySelector('.sign-up');
  const signInForm = document.querySelector('.sign-in');

  const signUpSubmit = signUpForm ? signUpForm.querySelector('.submit-btn') : null;
  const signInSubmit = signInForm ? signInForm.querySelector('.submit-btn') : null;

  if (signUpSubmit) {
    signUpSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'home.html';
    });
  }

  if (signInSubmit) {
    signInSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'home.html';
    });
  }
});