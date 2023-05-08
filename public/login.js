  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from 'https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js';
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries




  

  // // const app = initializeApp(firebaseConfig);
  // // const auth = getAuth(app);
  // const provider = new GoogleAuthProvider();
  // console.log("app initialized...");


function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);

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
  // firebase.initializeApp(firebaseConfig);


  // (async () => {
  //   try {
  //       firebase.initializeApp(firebaseConfig);
  //       //if user is logged in, it persists through refreshes, this eliminates that issue
  //       await firebase.auth().signOut();
  //       const createUserResult = await firebase
  //           .auth()
  //           .createUserWithEmailAndPassword("example@mit.edu", "secret")
  //           console.log('createUserResult', createUserResult)
  //       firebase.auth().signOut();
  //   } catch(e) {
  //       console.log(e);
  //   }
  // })();

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

// firebase.auth().onAuthStateChanged(firebaseUser => {
//   if(firebaseUser) {
//     console.log(firebaseUser);
//     logoutLink.style.display = 'inline';
//     loginLink.style.display = 'none';
//   }
//   else {
//     console.log(firebaseUser);
//     logoutLink.style.display = 'none';
//     loginLink.style.display = 'inline';
//   }
// });

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        // document.getElementById('loginLink').innerHTML = 'Login';
        document.getElementById('navbarUsername').innerHTML = '';
        document.getElementById('navbarDep').className = "nav-link d-none";
        document.getElementById('navbarWith').className = "nav-link d-none";
        document.getElementById('navbarBal').className = "nav-link d-none";
        document.getElementById('navbarTrans').className = "nav-link d-none";
        document.getElementById('navbarAll').className = "nav-link d-none";
        document.getElementById('logoutLink').className = "nav-link d-none";
        document.getElementById('loginLink').className = "nav-link";
        props.setShow(true);
       }
      }>
        Logout
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    // const auth  = firebase.auth();  
    // // const promise = auth.signInWithEmailAndPassword(email, password);
    // auth.signInWithEmailAndPassword(email, password)
    // // // signInWithEmailAndPassword(auth, email.value, password.value)
    // // // firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    // .then((userCredential) => {
    //   // Signed in
    //   console.log(userCredential);
    //   props.setStatus('');
    //   props.setShow(false);
    //   const loginStatus = document.getElementById('loginLink'); 
    //   const usernameStatus = document.getElementById('navbarUsername');
    //   // loginStatus.innerHTML = "Logout";
    //   usernameStatus.innerHTML = data.email;
    //   document.getElementById('navbarDep').className = "nav-link";
    //   document.getElementById('navbarWith').className = "nav-link";
    //   document.getElementById('navbarBal').className = "nav-link";
    //   document.getElementById('navbarTrans').className = "nav-link";
    //   document.getElementById('navbarAll').className = "nav-link";
    //   document.getElementById('loginLink').className = "nav-link d-none";
    //   document.getElementById('logoutLink').className = "nav-link";
    //   console.log('displays');
    //   // ctx.user.email = email;
    // })
    // .catch((error) => {
    //   console.log(error);
    //   props.setStatus(error);
    // });

    // login thru mongodb
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
            const loginStatus = document.getElementById('loginLink'); 
            const usernameStatus = document.getElementById('navbarUsername');
            // loginStatus.innerHTML = "Logout";
            usernameStatus.innerHTML = data.email;
            document.getElementById('navbarDep').className = "nav-link";
            document.getElementById('navbarWith').className = "nav-link";
            document.getElementById('navbarBal').className = "nav-link";
            document.getElementById('navbarTrans').className = "nav-link";
            document.getElementById('navbarAll').className = "nav-link";
            document.getElementById('loginLink').className = "nav-link d-none";
            document.getElementById('logoutLink').className = "nav-link";
            ctx.user.email = email;
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
    // end of login thru mongodb
  }

  // function handleGoogleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log(ctx);
  //     props.setStatus('');
  //     props.setShow(false);
  //     const loginStatus = document.getElementById('loginLink'); 
  //     const usernameStatus = document.getElementById('navbarUsername');
  //     // loginStatus.innerHTML = "Logout";
  //     usernameStatus.innerHTML = data.email;
  //     document.getElementById('navbarDep').className = "nav-link";
  //     document.getElementById('navbarWith').className = "nav-link";
  //     document.getElementById('navbarBal').className = "nav-link";
  //     document.getElementById('navbarTrans').className = "nav-link";
  //     document.getElementById('navbarAll').className = "nav-link";
  //     document.getElementById('loginLink').className = "nav-link d-none";
  //     document.getElementById('logoutLink').className = "nav-link";
  //     ctx.user.email = email.value;
  //     console.log(ctx);
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // }


  return (<>

    Email<br/>
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

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>

    {/* <hr></hr>

    OR, Sign In with your Google Account<br/>
    <button type="submit" className="btn btn-light" onClick={handleGoogleLogin}>Login With Google</button> */}
   
  </>);
}