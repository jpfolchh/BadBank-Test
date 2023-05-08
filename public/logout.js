function Logout(){
  const [show, setShow]     = React.useState(false);
  const [status, setStatus] = React.useState(''); 
  
  // firebase.auth().signOut();

  document.getElementById('navbarUsername').innerHTML = '';

  document.getElementById('navbarDep').className = "nav-link d-none";
  document.getElementById('navbarWith').className = "nav-link d-none";
  document.getElementById('navbarBal').className = "nav-link d-none";
  document.getElementById('navbarTrans').className = "nav-link d-none";
  document.getElementById('navbarAll').className = "nav-link d-none";
  document.getElementById('logoutLink').className = "nav-link d-none";
  document.getElementById('loginLink').className = "nav-link";


  return (
    <Card
      bgcolor="secondary"
      header="Logout"
      status={status}
      body={show ? 
        <LogoutForm setShow={setShow} setStatus={setStatus}/> :
        <LogoutMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LogoutMsg(props){
  return(<>
    <p>You've been successfully logged out</p>
    <a href="#/login/">Click here to log back in.</a>
  </>);
}

function LogoutForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
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
            loginStatus.innerHTML = "Logout";
            usernameStatus.innerHTML = data.email;
            document.getElementById('navbarDep').className = "nav-link";
            document.getElementById('navbarWith').className = "nav-link";
            document.getElementById('navbarBal').className = "nav-link";
            document.getElementById('navbarAll').className = "nav-link";
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }


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
   
  </>);
}