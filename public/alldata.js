function AllData(){
  const ctx = React.useContext(UserContext);
     return (
        <Card
          bgcolor="secondary"
          header="All Data"
          body={<TableForm/>}
        />
      )
    

    // return (<>
    //     <h5>All Data in Store:</h5>
    //     {data}
    // </>);
}


function TableForm (props){
    const [data, setData] = React.useState('');
    const [table, setTable] = [''];
    
    React.useEffect(() => {
    
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
                // setTable(JSON.parse(data));
                // const newTable = JSON.parse(data);             
                // console.log(newTable);   
            });

    }, []);


      const userTable = () => {
        return table.map((user, i) => {
        return (
          <tr
            key={i}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>${user.balance}</td>
          </tr>
        );
        });
      };

    // function createTable(data) {
    //     const table = '';
    //     const headerRow = document.createElement('tr');
        
    //     // Create table data rows
    //     for (const obj of data) {
    //       const dataRow = document.createElement('tr');
    //       for (const key of keys) {
    //         const dataCell = document.createElement('td');
    //         dataCell.textContent = obj[key];
    //         dataRow.appendChild(dataCell);
    //       }
    //       table.appendChild(dataRow);
    //     }
      
    //     return table;
    //   }

    return (
    <>
    <table id="allDataTable" width="100%">
    <thead>
        <tr width="100%">
        <th width="25%">Name</th>
        <th width="25%">Email</th>
        <th width="25%">Password</th>
        <th width="25%">Balance</th>
        </tr>
    </thead>
    {/* <tbody><tr><td colSpan='4'>{JSON.stringify(data)}</td></tr></tbody> */}
    <tbody><tr><td colSpan="4">{JSON.stringify(data)}</td></tr></tbody>
    </table>
    </>);
}



