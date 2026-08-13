// Initialize Supabase Client
const SUPABASE_URL = 'https://ywpgeksxqrtltlzjhvga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cGdla3N4cXJ0bHRsempodmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NDQ0MTMsImV4cCI6MjEwMjIyMDQxM30.MilEHzCx1qRXDN5U_5kf1MA0OJ98BDzNLYBBKtXZU9g'; // Replace with your actual Anon Key from Project Settings
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const container = document.getElementById('container');

// Panel & Role Switchers
function setMode(signUp) {
  container.classList.toggle('right-panel-active', signUp);
}

document.getElementById('overlay-login-btn')?.addEventListener('click', () => setMode(false));
document.getElementById('overlay-signup-btn')?.addEventListener('click', () => setMode(true));
document.getElementById('switch-to-signup')?.addEventListener('click', () => setMode(true));
document.getElementById('switch-to-login')?.addEventListener('click', () => setMode(false));

// Role Pill Selection
document.querySelectorAll('.role-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.form-panel');
    panel.querySelectorAll('.role-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panel.dataset.role = btn.dataset.role;
  });
});

// Method Pill Selection (Password vs OTP)
document.querySelectorAll('.method-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.form-panel');
    panel.querySelectorAll('.method-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panel.dataset.login = btn.dataset.login;
  });
});

// Eye Toggle Password
document.querySelectorAll('.toggle-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const pwInput = btn.closest('.input-wrap').querySelector('input');
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
  });
});

/* ==========================================================================
   AUTHENTICATION & DATABASE LOGIC
   ========================================================================== */

// 1. SIGN UP & SAVE CUSTOM USER DATA
const signUpPanel = document.querySelector('.form-panel.sign-up');
const signUpBtn = signUpPanel.querySelector('.submit-btn');

signUpBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const role = signUpPanel.dataset.role; // 'student' or 'hostel'

  // Extract base input fields
  const email = signUpPanel.querySelector('input[type="email"]')?.value;
  const password = signUpPanel.querySelector('input[type="password"]')?.value;

  if (!email || !password) {
    alert('Please enter an email and password.');
    return;
  }

  // A. Create Auth Account in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) {
    alert(`Sign Up Error: ${authError.message}`);
    return;
  }

  const userId = authData.user?.id;
  if (!userId) {
    alert('Verification email sent! Please check your inbox.');
    return;
  }

  // B. Collect Custom Profile Fields based on selected Role
  let profileData = { id: userId, role };

  if (role === 'student') {
    const inputs = signUpPanel.querySelectorAll('.student-only input, .student-only select');
    profileData = {
      ...profileData,
      username: inputs[0]?.value || null,
      full_name: inputs[2]?.value || null,
      phone: inputs[3]?.value || null,
      college: inputs[4]?.value || null,
      college_location: inputs[5]?.value || null,
      aadhar_no: inputs[6]?.value || null,
      gender: signUpPanel.querySelector('.student-only select')?.value || null,
      father_name: inputs[8]?.value || null,
      father_contact: inputs[9]?.value || null,
      dob: inputs[10]?.value || null,
      branch: inputs[11]?.value || null,
      permanent_address: inputs[12]?.value || null
    };
  } else if (role === 'hostel') {
    const inputs = signUpPanel.querySelectorAll('.hostel-only input');
    profileData = {
      ...profileData,
      hostel_name: inputs[0]?.value || null,
      manager_name: inputs[1]?.value || null,
      phone: inputs[2]?.value || null,
      college_location: inputs[5]?.value || null
    };
  }

  // C. Insert profile details into public database
  const { error: dbError } = await supabase.from('profiles').insert([profileData]);

  if (dbError) {
    alert(`Error saving profile details: ${dbError.message}`);
  } else {
    alert('Account created and details saved successfully!');
  }
});

// 2. SEND OTP METHOD
const sendOtpBtn = document.querySelector('.send-btn');
sendOtpBtn?.addEventListener('click', async () => {
  const phoneInput = document.querySelector('.otp-row input[type="tel"]').value;
  if (!phoneInput) {
    alert('Please enter a valid phone number with country code (e.g. +919876543210)');
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: phoneInput
  });

  if (error) {
    alert(`Error sending OTP: ${error.message}`);
  } else {
    alert('OTP sent successfully to your phone!');
    sendOtpBtn.textContent = 'Resend OTP';
  }
});

// 3. LOG IN SUBMIT (Password or OTP Verification)
const signInPanel = document.querySelector('.form-panel.sign-in');
const signInBtn = signInPanel.querySelector('.submit-btn');

signInBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const loginMethod = signInPanel.dataset.login; // 'password' or 'otp'

  if (loginMethod === 'password') {
    const email = signInPanel.querySelector('.password-only input[type="text"]').value;
    const password = signInPanel.querySelector('.password-only input[type="password"]').value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else {
      alert('Login successful!');
      console.log('Authenticated user:', data.user);
    }
  } else if (loginMethod === 'otp') {
    const phone = signInPanel.querySelector('.otp-row input[type="tel"]').value;
    const token = signInPanel.querySelector('.otp-only input[maxlength="6"]').value;

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });

    if (error) {
      alert(`OTP Verification failed: ${error.message}`);
    } else {
      alert('Phone verified and logged in successfully!');
      console.log('Authenticated user:', data.user);
    }
  }
});

// 4. GOOGLE OAUTH LOGIN
document.querySelectorAll('.google-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) alert(`Google sign in error: ${error.message}`);
  });
});