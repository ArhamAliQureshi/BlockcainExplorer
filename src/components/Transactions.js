import React from 'react';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import data from './transactions.json';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import GetTransactionsByAccount from '../services/GetTransactionsByAccount'


function Transactions() {
    
    return <>
        <h2>Transactions</h2>
        <hr />
        <Accordion>
            {data.result.map(item =>
                <Card key={item.blockNumber}>
                    <Accordion.Toggle as={Card.Header} eventKey={item.blockNumber} style={{ cursor: "pointer" }}>
                        <Row>
                            <Col><b>Hash#</b> {item.hash}</Col>
                            <Col><b>Block#</b> {item.blockNumber}</Col>
                            <Col><b>From:</b> {item.from}</Col>
                            <Col><b>To:</b> {item.to}</Col>
                            <Col><b>value:</b> {item.value / 1000000}</Col>
                            <Col><b>Token:</b> {item.tokenName}({item.tokenSymbol})</Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={item.blockNumber}>
                        {/* <Card.Body><pre>{JSON.stringify(item, undefined, 1)}</pre></Card.Body> */}
                        <JSONPretty data={item}></JSONPretty>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion></>;
}

export default Transactions;