const container = document.getElementById('container');

// Function to switch panel mode
function setMode(signUp) {
  container.classList.toggle('right-panel-active', signUp);
}

// Overlay button triggers
document.getElementById('overlay-login-btn')?.addEventListener('click', () => setMode(false));
document.getElementById('overlay-signup-btn')?.addEventListener('click', () => setMode(true));

// Mobile switch triggers
document.getElementById('switch-to-signup')?.addEventListener('click', () => setMode(true));
document.getElementById('switch-to-login')?.addEventListener('click', () => setMode(false));

// Role pills handler (Student / Hostel)
document.querySelectorAll('.role-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.form-panel');
    panel.querySelectorAll('.role-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panel.dataset.role = btn.dataset.role;
  });
});

// Login method pills handler (Password / OTP)
document.querySelectorAll('.method-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.form-panel');
    panel.querySelectorAll('.method-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panel.dataset.login = btn.dataset.login;
  });
});

// Password show/hide toggle
document.querySelectorAll('.toggle-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const pwInput = btn.closest('.input-wrap').querySelector('input');
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
  });
});

// Send OTP button action
document.querySelectorAll('.send-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = 'Resend';
  });
});