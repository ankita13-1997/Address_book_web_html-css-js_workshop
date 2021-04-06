let contactList;
window.addEventListener('DOMContentLoaded',(event) => {
    contactList = getContactDataFromStorage();
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editContact');
  });

  const getContactDataFromStorage = () => {
    return localStorage.getItem("ContactList") ?
                        JSON.parse(localStorage.getItem('ContactList')) : [];
  }

  const createInnerHtml = () => {
    const headerHtml = ` 
      <th>FULL NAME</th>
      <th>ADDRESS</th>
      <th>CITY</th>
      <th>STATE</th>
      <th>ZIP CODE</th>
      <th>PHONE NUMBER</th>
      <th>EMAIL</th>
    `;
    if(contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const contactData of contactList)
    {
    innerHtml = `${innerHtml}
    <tr>
        <td>${contactData._firstName} ${contactData._lastName}</td>
        <td>${contactData._address}</td>
        <td>${contactData._city}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zip}</td>
        <td>${contactData._phone}</td>
        <td>${contactData._email}</td>
        <td>
        <img id="${contactData._id}" onclick="remove(this)" alt="delete" 
                src="../assets/delete2.jpg" style ="height: 40px;">
        <img id="${contactData._id}" alt="edit" onclick="update(this)"
                src="../assets/edit.jpg" style ="height: 40px;">
        </td>
    </tr>
    `;
    }
  document.querySelector('#table-display').innerHTML = innerHtml;
  }

  const remove = (node) => {
      let contact = contactList.find(cnt => cnt._id == node.id);
      if(!contact) return;
      const index = contactList.map(cnt => cnt._id).indexOf(contact._id);
      contactList.splice(index,1);
      document.querySelector(".person-count").textContent = contactList.length;
      localStorage.setItem("ContactList",JSON.stringify(contactList));
      createInnerHtml();
  }

  const update = (node) => {
    let contact = contactList.find(cnt => cnt._id == node.id);
    if(!contact) return;
    localStorage.setItem("editContact",JSON.stringify(contact));
    window.location.replace(siteproperties.add_contact_page);
  }