function NavBar(){
  return(

    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#002e66 "}}>
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none" id="navbarDep" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none" id="navbarWith" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none" id="navbarTrans" href="#/transfer/">Transfer</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none" id="navbarBal" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none" id="navbarAll" href="#/alldata/">AllData</a>
          </li>        
        </ul>
        <span className="navbar-text" id="navbarUsername"> </span>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" id="loginLink" href="#/login/">Login</a>
          </li>  
          <li className="nav-item">
            <a className="nav-link d-none" id="logoutLink" href="#/logout/">Logout</a>
          </li>  
       </ul>
      </div>
    </nav>

  );
}