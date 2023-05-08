function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function validateWithdraw(field, balance){
  if (!Number(field)) {
        alert('Error: ' + label + ' field is not a number. Please enter the amount you wish to deposit');
        setTimeout(() => setStatus(''),3000);
        return false;
  }
  console.log(balance);
  // if (Number(field) > balance) {
  //   alert('Withdrawal amount must be at or below your balance amount of $' + balance);
  //   setTimeout(() => setStatus(''),3000);
  //   return false;
  // } 
  return true;
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Click here to make another withdrawal
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [balance, setBalance] = React.useState(0);

  const ctx = React.useContext(UserContext);
  setEmail(ctx.user.email);
  console.log(email);
  // const userEmail = ctx.user.email;  

  function handle(){
    // fetch(`/account/findOne/${email}`)
    // .then(response => response.text())
    // .then(text => {
    //     try {
    //         const data = JSON.parse(text);
    //         setBalance(data.value.balance);
    //         console.log('JSON:', data.value.balance);
    //     } catch(err) {
    //         props.setStatus(text)
    //         console.log('err:', text);
    //     }
    // });
  
    if (!validateWithdraw(amount, balance))    return;
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('$' + amount + ' was successfully withdrawn from your account. Your new balance is: $' + data.value.balance);
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }


  return(<>

    <input type="input" 
      className="form-control d-none" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Please enter the amount you wish to withdraw<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => { setAmount(e.currentTarget.value); setEmail(document.getElementById('navbarUsername').innerHTML) }}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
