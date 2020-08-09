import React from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'



class Search extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount = async () => {
        // window.ethereum.on('accountsChanged', function (accounts) {
        //     // Time to reload your interface with accounts[0]!
        //   })
    }
    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        var object = {};
        formData.forEach((value, key) => {
            // Reflect.has in favor of: object.hasOwnProperty(key)
            if (!Reflect.has(object, key)) {
                object[key] = value;
                return;
            }
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        });
        this.props.setAddresses(object);
    }

    render() {
        return <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <InputGroup className="mb-3">
                    <FormControl
                        name="contractAddress"
                        placeholder="Contract Address"
                        aria-label="Contract Address"
                        aria-describedby="basic-addon2"
                        defaultValue="0xdAC17F958D2ee523a2206206994597C13D831ec7"
                    />
                    <FormControl
                        name="accountAddress"
                        placeholder="Account Address"
                        aria-label="Account Address"
                        aria-describedby="basic-addon2"
                        defaultValue="0x08403aB7e92C2d9043361DDA03B3D489Ff4B1Dfb"
                    />
                    <InputGroup.Append>
                        <Button variant="primary" type="submit">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAddresses: (payload) => {
            dispatch({ type: "SET_ADDRESS", payload });
        }
    }
}
// export default Search;

export default connect(null, mapDispatchToProps)(Search)
