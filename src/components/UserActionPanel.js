import { Row, Col, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function UserActionPanel(props) {
  let {
    chooseCurrencies,
    selectCurrencies,
    allCurrencies,
    amount,
    insertCurrenciesAmount,
  } = props;
  return (
    <Row className="">
      <Col lg={3}>
        <div className="mb-2">
          <Form.Select
            aria-label="Default select example"
            value={chooseCurrencies}
            onChange={selectCurrencies}
          >
            {allCurrencies.length > 0 &&
              allCurrencies.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
          </Form.Select>
        </div>
      </Col>
      <Col lg={6}>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            placeholder="Please enter amount"
            value={amount}
            onChange={insertCurrenciesAmount}
          />
        </InputGroup>
      </Col>
      <Col lg={3}></Col>
    </Row>
  );
}

export default UserActionPanel;
