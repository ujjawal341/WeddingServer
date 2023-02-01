const serverRooturl = 'http://localhost:5000/user/';

//handle login submit
const loginFormDetails = document.getElementById('loginSubmit');
// console.log('login Det', loginFormDetails);

loginFormDetails.addEventListener('submit', (event) => {
  const userLoginData = {
    email: document.getElementById('email').value,
    password: document.getElementById('pass').value,
    category: getUsercat(),
  };
  console.log(userLoginData);
  postLoginData(userLoginData);
  event.preventDefault();
});
const getUsercat = () => {
  const users = document.getElementsByName('user-category');
  for (let i = 0; i < users.length; i++) {
    if (users[i].checked) {
      return users[i].value;
    }
  }
  return 'Not Selected';
};
const postLoginData = async (userLoginData) => {
  try {
    const res = await fetch(serverRooturl + '/login', {
      method: 'POST',
      body: JSON.stringify(userLoginData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data.auth) {
      window.location.replace('../html/home.html');
    }
    console.log('Success Resopnose from server', data);
  } catch (err) {
    console.log('Error while Posting login DATA', err);
  }
};
