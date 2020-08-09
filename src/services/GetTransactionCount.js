function GetTransactionCount(web3, account) {
    return new Promise((resolve, reject) => {
        web3.eth.getTransactionCount(account, (err, count) => {
            console.log(count, "<<<COUNT");
            resolve(count);
        })
    });
}

export default GetTransactionCount;