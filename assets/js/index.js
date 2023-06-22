document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  //all functions shouldn't make browser refresh

  const body = document.querySelector('body');
  const messageList = document.querySelector('message-list');
  const msgId = [];
  
  const updatesMessageBoard = setInterval(() => {
    fetch('/allMsg')
    .then(res => res.json()) //only getting properties we want in res.locals - res is huge - res is json 
    .then(data => {
      //filter out old msgs already displayed using the array initialized in line 4
      const filteredMsg = data.filter(message => !msgId.includes(message._id));

      filteredMsg.forEach((ele) => {
        const msgEle = document.createElement('li');
        const deleteBtn = document.createElement('button');
        msgEle.id = ele._id;
        deleteBtn.classList.add('del');
        deleteBtn.textContent = 'Delete';
        deleteBtn.id = ele._id;
        msgEle.append(deleteBtn);
        msgId.push(ele._id);
      })
    })
  }, 2000);

  const saveBtn = document.getElementById('save');
  const passwordField = document.getElementById('pass');
  const messageField = document.getElementById('desc');
  saveBtn.addEventListener('click', () => {
    if (passwordField.value.length === 0 || messageField.value.length === 0){
      alert();
      return;
    }
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: messageFIeld.value, password: passwordField.value})
    })
    .then(res => res.json()) 
    .then(data => {
      const msgEle = document.createElement('li');
      const deleteBtn = document.createElement('button');
      msgEle.id = ele._id;
      deleteBtn.classList.add('del');
      deleteBtn.textContent = 'Delete';
      deleteBtn.id = ele._id;
      msgEle.append(deleteBtn);
      msgId.push(ele._id);
  })


  messageList.addEventListener('click', (e) => {
    const parentEle = e.target.parentNode;
    fetch('/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id: parentEle.id})
    });
    parentEle.parentNode.removeChild(parentEle);
  })

  //READ FUNCTIONALITY

  //setInterval(helperFunction that invokes the fetch for getMessages, 2000);
  //"After the page has initially loaded, all messages from the database should be displayed as list items in the #message-list element."
  //The application should poll for new messages from the database every two seconds and display them. Messages should not display in the list multiple times
  //Unsure whether this should perhaps be listed outside this space, towards the bottom, or whether we need refresh/timeout?

  await fetch('/getMessages')
    .then(data => {

      //with the message-list element in index.html
      //should fetch all messages, with the messageList in the response object
      //I want to iterate through the array
      //and create a li item
      //each li item should display, inline:
      //the message with a template literal


      for (let i = 0; i < data.length; i++){
        //<li>This is a great message!<button class="del">Delete</button></li>
        const line = document.createElement('li');
        line.innerText = data[i].message;

        //DELETE FUNCTIONALITY
        //delete button should be created within each <li> item
        //the deleteButton should have an eventlistener that when clicked
        //also sends a request to delete the corresponding message with a unique id
        //this id is probably the created_at property

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        line.appendChild(deleteButton);

        deleteButton.addEventListener('click', async (e) => {
          e.preventDefault();
          const value = data[i]._id;
          await fetch(`/deleteMessage/${value}`, {
            //fet
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  })
          });
        });
      }
    });

  //SAVE FUNCTIONALITY
  //the save button should have an event listener that deploys some logic
  //based on the logic: only if both password and input fields have text, would the fetch request be made, including the input field.

  const saveButton = document.getElementById('save');
  saveButton.type = 'button';
  const desc = document.getElementById('desc');
  saveButton.addEventListener('click', async(e) => {
    //conditional logic for existence of message and password, but commented out to see if I could at least get save to function either way

    // if ( password.value && desc.value){

    const password = document.getElementById('pass');

    //create fetch object
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({message: desc.value, password: password})
    };

    try{
      const response = await fetch('/postMessage', fetchOptions);
      const resJSON = await response.json();
      //   console.log(resJSON);
    } catch (err){
      console.log(err);
    }
    // }
  });
  body.appendChild(saveButton);
});