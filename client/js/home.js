// const addButton = document.getElementById('add-button');

// addButton.addEventListener('click', (ev) => {
//   console.log('Clicked ADD Cont');
//   const contDetails = document.getElementById('add-contact');
//   console.log('dis setting', contDetails.style.display);
//   if (contDetails.style.display === 'none') {
//     contDetails.style.display = 'block';
//     addButton.innerText = '-';
//   } else {
//     contDetails.style.display = 'none';
//     addButton.innerText = '+';
//   }
// });

const serverRooturl = 'http://localhost:5000/user/';

const getContacts = async () => {
  try {
    const res = await fetch(serverRooturl + 'contacts');
    const contData = await res.json();
    return contData.data;
  } catch (err) {
    console.log('Error While Requesting for Contact Data', err);
  }
};

const fillTable = async () => {
  const contArr = await getContacts();
  console.log('GET Data', contArr);

  const table = document.getElementById('contact-table');
  //   if (update) {
  //     const updatedCont = contArr[contArr.length - 1];
  //     const row = table.insertRow(-1);
  //     const cell1 = row.insertCell(-1);
  //     cell1.innerHTML = updatedCont.name;
  //     const cell2 = row.insertCell(-1);
  //     cell2.innerHTML = updatedCont.relation;
  //     const cell3 = row.insertCell(-1);
  //     cell3.innerHTML = updatedCont.place;
  //     const cell4 = row.insertCell(-1);
  //     cell3.innerHTML = updatedCont.invtDate;
  //   } else {
  for (let i = 0; i < contArr.length; i++) {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(-1);
    cell1.innerHTML = contArr[i].name;
    const cell2 = row.insertCell(-1);
    cell2.innerHTML = contArr[i].relation;
    const cell3 = row.insertCell(-1);
    cell3.innerHTML = contArr[i].place;
    const cell4 = row.insertCell(-1);
    cell4.innerHTML = contArr[i].invtDate;
    // cell.innerText = contArr[i].name;
    console.log(
      'cont ',
      contArr[i].name,
      contArr[i].relation,
      contArr[i].place,
      contArr[i].invtDate
    );
  }
};
fillTable();
// document.getElementById('post-contact').addEventListener('submit', (ev) => {
//   const newContact = {
//     name: document.getElementById('name').value,
//     relation: document.getElementById('relation').value,
//     place: document.getElementById('place').value,
//     invtDate: document.getElementById('invt-date').value,
//   };
//   postContactetails(newContact);
//   ev.preventDefault();
// });

// const postContactetails = async (data) => {
//   try {
//     const res = await fetch(serverRooturl + '/contacts', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//     const resData = await res.json();
//     console.log('CONT RES', resData);
//     fillTable(true);
//   } catch (err) {
//     console.log('Error while Adding new Contacts', err);
//   }
// };
