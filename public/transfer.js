function Transfer(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Transfer"
      status={status}
      body={show ? 
        <TransferForm setShow={setShow} setStatus={setStatus}/> :
        <TransferMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function validateTransfer(field, balance){
  if (!Number(field)) {
        alert('Error: ' + label + ' field is not a number. Please enter the amount you wish to transfer');
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

function TransferMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Click here to make another Transfer
    </button>
  </>);
}

function TransferForm(props){
  const [email, setEmail]   = React.useState('');
  const [recipient, setRecipient]   = React.useState('');
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
  
    if (!validateTransfer(amount, balance))    return;
    console.log('step 1: withdraw amount from your account');
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
          const data = JSON.parse(text);
          console.log('step 2: response from db after successful withdrawal');
          props.setStatus('$' + amount + ' was successfully withdrawn from your account. Your new balance is: $' + data.value.balance + ' - ');
          console.log('step 3: getting ready to deposit amount to recipient');
          fetch(`/account/update/${recipient}/${amount}`)
            .then(response => response.text())
            .then(text => {
                try {
                    // const dataR = JSON.parse(text);
                    console.log('step 4: response from db after successful deposit');
                    props.setStatus('$' + amount + ' was successfully transfered to:  ' + recipient + '  -- Your new balance is: $' + data.value.balance);
                    props.setShow(false);
                    // console.log('JSON:', dataR);
                } catch(err) {
                    props.setStatus('Transfer failed. Please enter a valid email address')
                    console.log('err:', text);
                }
            });
            
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Transfer failed')
            console.log('err:', text);
        }
    });
  }


  return(<>

    <p>Please enter the recipient's information, as well as the amount you would like to transfer today.</p>

    <input type="input" 
      className="form-control d-none" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
    
    Recipient's Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter recipient's email" 
      value={recipient} 
      onChange={e => { setRecipient(e.currentTarget.value); setEmail(document.getElementById('navbarUsername').innerHTML) }}/><br/>

    Please enter the amount you wish to transfer<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value) }/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Transfer
    </button>

  </>);
}
