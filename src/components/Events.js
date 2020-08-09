import React, { useState, useEffect } from 'react';
import { Accordion, Card, Row, Col, Button, Alert, Badge, Tabs, Tab, Jumbotron } from 'react-bootstrap';
import data from './transactions.json';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { connect } from 'react-redux'
import GetWeb3 from '../services/GetWeb3'
import { GetEvents } from '../services';

function Events(props) {
    const [web3, setWeb3] = useState();
    let [withdrawalEvents, setWithdrawalEvents] = useState([]);
    let [depositEvents, setDepositEvents] = useState([]);
    let [approvalEvents, setApprovalEvents] = useState([]);
    let [spenderEvents, setSpenderEvents] = useState([]);
    let [counter, setCounter] = useState(0);

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
                if (props.contractAddress) {
                    setWithdrawalEvents([]);
                    setDepositEvents([]);
                    setApprovalEvents([]);
                    setSpenderEvents([]);
                    await GetEvents.GetEventsFromLog(web3, props.contractAddress, props.accountAddress, setWithdrawalEvents);
                    await GetEvents.GetEventsToLog(web3, props.contractAddress, props.accountAddress, setDepositEvents);
                    await GetEvents.GetEventsApprovalLog(web3, props.contractAddress, props.accountAddress, setApprovalEvents);
                    await GetEvents.GetEventsSpenderlLog(web3, props.contractAddress, props.accountAddress, setSpenderEvents);
                }
            }
            catch (e) {
                console.log(e);
            }
        })()
    }, [props.contractAddress, props.accountAddress]);


    return <>
        <h2>Events</h2>
        {props.accountAddress && <><Button onClick={() => { setCounter(counter++); setCounter(counter++) }}>Load Events</Button>{"<== Please click load"}</>}
        {props.accountAddress && <Tabs defaultActiveKey="withdrawals" id="uncontrolled-tab-example">
            <Tab eventKey="withdrawals" title="Withdrawals">
                {withdrawalEvents.length > 0 && <Makelist web3={web3} events={withdrawalEvents} />}
                {withdrawalEvents.length === 0 && <Jumbotron>
                    <h3>Withdrawal events not available</h3>
                </Jumbotron>}
            </Tab>
            <Tab eventKey="deposit" title="Deposits">
                {depositEvents.length > 0 && <Makelist web3={web3} events={depositEvents} />}
                {depositEvents.length === 0 && <Jumbotron>
                    <h3>Deposit events not available</h3>
                </Jumbotron>}
            </Tab>
            <Tab eventKey="approvals" title="Approvals">
                {approvalEvents.length > 0 && <Makelist web3={web3} events={approvalEvents} />}
                {approvalEvents.length === 0 && <Jumbotron>
                    <h3>Approval events not available</h3>
                </Jumbotron>}
            </Tab>
            <Tab eventKey="spanders" title="Spenders">
                {spenderEvents.length > 0 && <Makelist web3={web3} events={spenderEvents} />}
                {spenderEvents.length === 0 && <Jumbotron>
                    <h3>Spender events not available</h3>
                </Jumbotron>}
            </Tab>
        </Tabs>}
        {!props.accountAddress && <Jumbotron>
            <h3>Please proivde account address</h3>
        </Jumbotron>}
        {/* {withdrawalEvents.length > 0 && <Makelist />} */}
    </>;
}

function Makelist(props) {

    return <Accordion>
        {props.events.length > 0 && <Alert variant="primary">Events from Block# {props.events[props.events.length - 1].blockNumber} {"==>"} {props.events[0].blockNumber}</Alert>}
        {props.events.map((item, key) =>
            <Card key={key}>
                <Accordion.Toggle as={Card.Header} eventKey={item.blockNumber} style={{ cursor: "pointer" }}>
                    {item.event === "Transfer" && <Row>
                        <Col><b>Event Name</b> {item.event}</Col>
                        <Col><b>Hash#</b> {item.blockHash}</Col>
                        <Col><b>Block#</b> {item.blockNumber}</Col>
                        <Col><b>From:</b> {item.returnValues.from}</Col>
                        <Col><b>To:</b> {item.returnValues.to}</Col>
                        <Col><b>value:</b> {props.web3.utils.fromWei(item.returnValues.value, 'ether') + " ETH"}</Col>
                    </Row>}
                    {item.event === "Approval" && <Row>
                        <Col><b>Event Name</b> {item.event}</Col>
                        <Col><b>Hash#</b> {item.blockHash}</Col>
                        <Col><b>Block#</b> {item.blockNumber}</Col>
                        <Col><b>Owner:</b> {item.returnValues.owner}</Col>
                        <Col><b>Spander</b> {item.returnValues.spender}</Col>
                        <Col><b>value:</b> {props.web3.utils.fromWei(item.returnValues.value, 'ether') + " ETH"}</Col>
                    </Row>}
                    <hr />
                    <Row className="justify-content-md-center">
                        <Badge pill variant="primary">↓Click to expand↓</Badge>
                    </Row>

                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.blockNumber}>
                    {/* <Card.Body><pre>{JSON.stringify(item, undefined, 1)}</pre></Card.Body> */}
                    <JSONPretty data={item}></JSONPretty>
                </Accordion.Collapse>
            </Card>
        )}
    </Accordion>;
}

function mapStateToProps(state, ownProps) {
    return {
        contractAddress: state.contractAddress,
        accountAddress: state.accountAddress
    };
}
export default connect(mapStateToProps, null)(Events)

