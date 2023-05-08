function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function validateDep(field, label){
  if (!Number(field)) {
        alert('Error: ' + label + ' field is not a number. Please enter the amount you wish to deposit');
        setTimeout(() => setStatus(''),3000);
        return false;
  }
  if (Number(field) <= 0) {
    alert('Error: ' + label + ' amount must be above $0.');
    setTimeout(() => setStatus(''),3000);
    return false;
}
    return true;
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  const ctx = React.useContext(UserContext);
  setEmail(ctx.user.email);
  console.log(email);
  // const userEmail = ctx.user.email;  

  // setEmail(document.getElementById('navbarUsername').innerHTML);

  function handle(){
    // if (!validateDep(amount,    'Amount'))    return;
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('$' + amount + ' was successfully deposited to your account. Your new balance is: $' + data.value.balance);
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed. Please enter a valid email address')
            console.log('err:', text);
        }
    });
  }

  return(<>

    <input type="input" 
      className="form-control d-none" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Please enter the amount you wish to deposit<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => { setAmount(e.currentTarget.value); setEmail(document.getElementById('navbarUsername').innerHTML) }}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}