const serverRooturl = 'http://localhost:5000/user/';

document.getElementById('post-contact').addEventListener('submit', (ev) => {
  const newContact = {
    name: document.getElementById('name').value,
    // relation: document.getElementById('relation').value,
    place: document.getElementById('place').value,
    invtDate: document.getElementById('invt-date').value,
  };
  postContactetails(newContact);
  ev.preventDefault();
});

const postContactetails = async (data) => {
  try {
    const res = await fetch(serverRooturl + 'add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const resData = await res.json();
    document.getElementById('welMessage').innerText = resData.message;
    console.log('CONT RES', resData);
  } catch (err) {
    console.log('Error while Adding new Contacts', err);
  }
};
