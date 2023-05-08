function Home(){
  return (
    <Card
      txtcolor="white"
      header="JP Folch's BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar above"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
