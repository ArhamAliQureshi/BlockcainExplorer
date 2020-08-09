import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import QRCode from 'qrcode.react';
import { Jumbotron, Table, Row, Col, Alert } from 'react-bootstrap';
import GetWeb3 from '../services/GetWeb3'
import { GetAccountBalance, GetTransactionCount } from '../services';

function AccountDetail(props) {
    const [web3, setWeb3] = useState();
    const [balance, setBalance] = useState();
    const [transactionCount, setTransactionCount] = useState();
    useEffect(() => {
        (async () => {
            try {
                setWeb3(await GetWeb3());
            }
            catch (e) {
                console.log(e);
            }
        })()
    }, []);
    useEffect(() => {
        (async () => {
            try {
                if (props.accountAddress) {
                    let bal = await GetAccountBalance(web3, props.accountAddress);
                    let transactionCount = await GetTransactionCount(web3, props.accountAddress);
                    setBalance(bal + " ETH");
                    setTransactionCount(transactionCount);
                }
            }
            catch (e) {
                console.log(e);
            }
        })()
    }, [props.accountAddress]);

    return <>
        <h2>Account Details</h2>
        <hr />
        {props.accountAddress && <Row>
            <Col>
                {/* <Card> */}
                <QRCode value={props.contractAddress} />
                <Alert variant="primary">
                    Contract Address
                    </Alert>
                <QRCode value={props.accountAddress} />
                <Alert variant="success">
                    Account Address
                    </Alert>
                {/* </Card> */}
            </Col>
            <Col>
                <Table>
                    <tbody>
                        <tr>
                            <td className="Light-Cell">Hash</td>
                            <td>{props.accountAddress}</td>
                        </tr>
                        <tr>
                            <td className="Light-Cell">Nonce</td>
                            <td>{transactionCount}</td>
                        </tr>
                        <tr>
                            <td className="Light-Cell">Final Balance</td>
                            <td>{balance}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>}
        {!props.accountAddress && <Jumbotron>
            <h3>Please proivde account address</h3>
        </Jumbotron>}
    </>;
}

// export default AccountDetail;
function mapStateToProps(state, ownProps) {
    return {
        contractAddress: state.contractAddress,
        accountAddress: state.accountAddress
    };
}
export default connect(mapStateToProps, null)(AccountDetail)


