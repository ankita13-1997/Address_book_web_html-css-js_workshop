let isUpdate = false;
let contactObject = {};

window.addEventListener('DOMContentLoaded', (event) => {

  const name = document.querySelector('#name'); 
  const textError = document.querySelector('.name-error');
  name.addEventListener('input', function () {
    let names = document.querySelector('#name').value.split(" ");
    if(name.value.length == 0){
      textError.textContent = "";
      return;
  }
  try{
      (new Contact()).firstName = names[0];
      (new Contact()).lastName = names[1];
      textError.textContent = "";
  }catch(e){
      textError.textContent = e;
  }
  });

  const addressElement = document.querySelector('#address');
  const addressError = document.querySelector('.address-error');
  addressElement.addEventListener('input', function() {
    let address = document.querySelector('#address').value;
    try{
      (new Contact()).address = address;
      addressError.textContent = ""
    }catch(e){
      addressError.textContent = e;
    }
  });

  const phoneElement = document.querySelector('#phone');
  const phoneError = document.querySelector('.phone-error');
  phoneElement.addEventListener('input', function() {
    let phone = document.querySelector('#phone').value;
    try{
      (new Contact()).phone = phone;
      phoneError.textContent = "";
    }catch(e){
      phoneError.textContent = e;
    }

  });

  const emailElement = document.querySelector('#email');
  const emailError = document.querySelector('.email-error');
  emailElement.addEventListener('input', function() {
    let email = document.querySelector('#email').value;
    try{
      (new Contact()).email = email;
      emailError.textContent = "";
    }catch(e){
      emailError.textContent = e;
    }

  });

  checkForUpdate();
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try{
      setContactObject();
      createAndUpdateStorage();
      resetForm();
      window.location.replace(siteproperties.home_page);
  }catch(e){
    console.log(e);
    return;
  }
}

const setContactObject = () => {
  let names = getInputValueById('#name').split(" ");
  contactObject._firstName = names[0];
  contactObject._lastName = names[1];
  contactObject._address = getInputValueById('#address');
  contactObject._city = getInputValueById('#city');
  contactObject._state = getInputValueById('#state');
  contactObject._zip = getInputValueById('#zip');
  contactObject._phone = getInputValueById('#phone');
  contactObject._email = getInputValueById('#email');
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const createAndUpdateStorage = () => {
  let contactList = JSON.parse(localStorage.getItem("ContactList"));
  if(contactList){
      let contactData = contactList.
                          find(contact => contact._id == contactObject._id);
      if(!contactData)
      contactList.push(createContactData());
      else{
          const index = contactList.map(cnt => cnt._id)
                                           .indexOf(contactData._id);
          contactList.splice(index,1,createContactData(contactData._id));
      }
  }
  else{
    contactList = [createContactData()];
  }
  localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const createContactData = (id) => {
  let contactData = new Contact();
  if(!id)
  contactData.id = createNewContactId();
  else
  contactData.id = id;
  setContactData(contactData);
  return contactData;
}

const createNewContactId = () => {
  let cntID = localStorage.getItem("ContactID");
  cntID = !cntID ? 1 : (parseInt(cntID)+1).toString();
  localStorage.setItem("ContactID",cntID);
  return cntID;
}

const setContactData = (contactData) => {
  try{
    contactData.firstName = contactObject._firstName;
  }catch(e){
      setTextValue('.name-error',e);
  }

  try{
    contactData.lastName = contactObject._lastName;
  }catch(e){
      setTextValue('.name-error',e);
  }

  try{
    contactData.address = contactObject._address;
  }catch(e){
      setTextValue('.address-error',e);
  }

  contactData.city = contactObject._city;
  contactData.state = contactObject._state;
  contactData.zip = contactObject._zip;

  try{
    contactData.phone = contactObject._phone;
  }catch(e){
      setTextValue('.phone-error',e);
  }

  try{
    contactData.email = contactObject._email;
  }catch(e){
      setTextValue('.email-error',e);
  }

  alert(contactData.toString());
}

const setTextValue = (id,value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const resetForm = () => {
    setValue('#name','');
    setValue('#address','');
    setSelectedIndex('#city',0);
    setSelectedIndex('#state',0);
    setValue('#zip','');
    setValue('#phone','');
    setValue('#email','');
}

const setValue = (id,value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setSelectedIndex = (id,index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const checkForUpdate = () => {
  const contactJson = localStorage.getItem('editContact');
  isUpdate = contactJson ? true : false;
  if(!isUpdate) return;
  contactObject = JSON.parse(contactJson);
  setForm();
}

const setForm = () => {
  setValue('#name', contactObject._firstName+" "+contactObject._lastName);
  setValue('#address',contactObjectj._address);
  setValue('#city',contactObject._city);
  setValue('#state',contactObject._state);
  setValue('#zip',contactObject._zip);
  setValue('#phone',contactObject._phone);
  setValue('#email',contactObject._email);
}