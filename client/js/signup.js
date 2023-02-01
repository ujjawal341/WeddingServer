//handle signup
// import { getUsercat, serverRooturl } from './index.js';
const serverRooturl = 'http://localhost:5000/user/';
const getUsercat = () => {
  const users = document.getElementsByName('user-category');
  for (let i = 0; i < users.length; i++) {
    if (users[i].checked) {
      return users[i].value;
    }
  }
  return 'Not Selected';
};
const signupDetails = document.getElementById('signupSubmit');

signupDetails.addEventListener('submit', (ev) => {
  const pass = document.getElementById('pass').value;
  const confPass = document.getElementById('cnfm-pass').value;
  if (pass !== confPass) {
    document.getElementById('pass-mismatch').innerHTML =
      "Password didn't match";
  } else {
    const newUser = {
      fname: document.getElementById('fname').value,
      mname: document.getElementById('mname').value,
      lname: document.getElementById('lname').value,
      email: document.getElementById('email').value,
      category: getUsercat(),
      password: pass,
    };
    handleSignup(newUser);
    console.log('Success SugnUp', newUser);
  }

  ev.preventDefault();
});

const handleSignup = async (newUser) => {
  try {
    console.log('calling serer for', newUser);
    const res = await fetch(serverRooturl + '/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log('Success Resopnose from server', data);
  } catch (err) {
    console.log('Error while Posting login DATA', err);
  }
};
