function GetAccountBalance(web3, account){
    return new Promise ((resolve, reject)=>{
        web3.eth.getBalance(account, (err, bal) => {
            let balance = web3.utils.fromWei(bal, 'ether');
            resolve(balance);  
        })
    });
}
export default GetAccountBalance;