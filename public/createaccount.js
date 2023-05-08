  // // firebase
  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyAJwqRpbm3j0w13nYwEtXzWPE9QTYhzMKY",
  //   authDomain: "jpfh-mit-badbank.firebaseapp.com",
  //   projectId: "jpfh-mit-badbank",
  //   storageBucket: "jpfh-mit-badbank.appspot.com",
  //   messagingSenderId: "143226936995",
  //   appId: "1:143226936995:web:2b5c3bdeea772433f36916"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);


function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function validateCreate(field, label){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!field) {
    alert('ERROR: ' + label + ' field is blank. Please enter your ' + label + '.');
    setTimeout(() => setStatus(''),3000);
    return false;
  }
  if (label === 'Email') {
    if (!emailRegex.test(field)) {
      alert('ERROR: Please enter a valid email.');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
  }

  if (label === 'Password') {
    if (field.length < 8) {
      alert('ERROR: Please enter a password that is at least 8 characters long.');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
  }
  return true;
}

function CreateMsg(props){
  return(<>
    <h5>Welcome!</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Click here to create another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle(){
    console.log(name,email,password);
    if (!validateCreate(name,     'Name'))     return;
    if (!validateCreate(email,    'Email'))    return;
    if (!validateCreate(password, 'Password')) return;

    // // firebase signup with email & password
    // const auth = firebase.auth();
    // const promise = auth.createUserWithEmailAndPassword(auth, email.value,password.value);
    // promise.catch(e => console.log(e.message));

    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    props.setShow(false);
  }

  // // create account with google
  // function handleGoogle() {console.log("google sign in clicked");
  //   // const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       const url = `/account/create/${name}/${email}/${password}`;
  //       (async () => {
  //           var res  = await fetch(url);
  //           var data = await res.json();    
  //           console.log(data);        
  //       })();
  //     props.setShow(false);
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  //   };

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account with Email</button>

    <button type="submit" 
      className="btn btn-light" 
      id="googlesignup"onClick={handleGoogle}>Sign-Up with your Google Account</button>

  </>);
}