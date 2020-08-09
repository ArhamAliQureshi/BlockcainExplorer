import axios from 'axios';
var abi = {};
async function getABI(contractAddress) {
    console.log(contractAddress);
    if(abi[contractAddress]){
        return abi[contractAddress]
    }
    let response = await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`);
    abi[contractAddress] = JSON.parse(response.data.result);
    return abi[contractAddress];
}

const GetEventsFromLog = (web3, contractAddress, accountAddress, callback) => {
    let events = [];
    
    return new Promise((resolve, reject) => {
        (async () => {
            let abi = await getABI(contractAddress);
            let contractInstance = new web3.eth.Contract(abi, contractAddress);
            const lastBlock = await web3.eth.getBlockNumber();

            contractInstance.events.Transfer({
                // filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' },
                filter: { from: accountAddress },
                toBlock: lastBlock,
                fromBlock: lastBlock - 100000
            },
                function (error, event) {
                    events.push(event);
                    callback(events);
                });
            resolve(contractInstance);
        })()

    });

}

const GetEventsToLog = (web3, contractAddress, accountAddress, callback) => {
    let events = [];
    return new Promise((resolve, reject) => {
        (async () => {
            let abi = await getABI(contractAddress);
            let contractInstance = new web3.eth.Contract(abi, contractAddress);
            const lastBlock = await web3.eth.getBlockNumber();

            contractInstance.events.Transfer({
                // filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' },
                filter: { to: accountAddress },
                toBlock: lastBlock,
                fromBlock: lastBlock - 100000
            },
                function (error, event) {
                    events.push(event);
                    callback(events);
                });
            resolve(contractInstance);
        })()

    });

}

const GetEventsApprovalLog = (web3, contractAddress, accountAddress, callback) => {
    let events = [];
    return new Promise((resolve, reject) => {
        (async () => {
            let abi = await getABI(contractAddress);
            let contractInstance = new web3.eth.Contract(abi, contractAddress);
            const lastBlock = await web3.eth.getBlockNumber();

            contractInstance.events.Approval({
                // filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' },
                filter: { owner: accountAddress },
                toBlock: lastBlock,
                fromBlock: lastBlock - 100000
            },
                function (error, event) {
                    events.push(event);
                    callback(events);
                    
                });
            resolve(contractInstance);
        })()

    });

}

const GetEventsSpenderlLog = (web3, contractAddress, accountAddress, callback) => {
    let events = [];
    return new Promise((resolve, reject) => {
        (async () => {
            let abi = await getABI(contractAddress);
            let contractInstance = new web3.eth.Contract(abi, contractAddress);
            const lastBlock = await web3.eth.getBlockNumber();

            contractInstance.events.Approval({
                // filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' },
                filter: { spender: accountAddress },
                toBlock: lastBlock,
                fromBlock: lastBlock - 100000
            },
                function (error, event) {
                    events.push(event);
                    callback(events);
                    
                });
            resolve(contractInstance);
        })()

    });

}

export default  {GetEventsFromLog, GetEventsToLog, GetEventsApprovalLog, GetEventsSpenderlLog};