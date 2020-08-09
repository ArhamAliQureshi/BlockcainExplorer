import Web3 from "web3";
//TODO: Implement Singleton
/*
let GetWeb3Singleton = (async ()=>{
    let web3;
    async function createInstance(){
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable()
            //Can use web3 with Metamask
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
        return web3;
    }
    return {
        getInstance: async function () {
            if (!web3) {
                web3 = await createInstance();
            }
            return Promise.resolve(web3);
        }
    };
})();
*/

const GetWeb3 = async () => {
    let web3;
    try {
        
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable()
            //Can use web3 with Metamask
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
        return web3;
    }
    catch (e) {
        console.log(e);
    }


    return false;
}

export default GetWeb3;