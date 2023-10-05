import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, InputGroup, Row, Col, Table } from "react-bootstrap";

function Main() {
  const [allCurrencies, setAllCurrencies] = React.useState(null);
  const [chooseCurrencies, setChooseCurrencies] = React.useState("");
  const [currenciesData, setCurrenciesData] = React.useState(null);

  React.useEffect(() => {
    // initially load list of currencies
    axios
      .get("https://openexchangerates.org/api/currencies.json")
      .then((response) => {
        const objectToArray = Object.keys(response.data).map((key) => key);
        setAllCurrencies(objectToArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!allCurrencies) return null;

  const selectCurrencies = async (e) => {
    setChooseCurrencies(e.target.value);
    // console.log('aaa ', e.target.value);
    // let parameter = {
    //   url: "https://openexchangerates.org/api/currencies.json",
    //   method: "get",
    // };
    // await axios(parameter)
    //   .then((response) => {
    //     console.log(response);
    //     // props.setCurrenciesData(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const insertCurrenciesAmount = (e) => {
    console.log(e.target.value);
  };

  return (
    <Container>
      <Row className="text-center p-5">
        <Col>
          {/* <h1>Currency Exchange Rate</h1> */}
        </Col>
      </Row>
      <div className="shadow p-3 mb-3 bg-body rounded border-top">
        <Row className="">
          <Col lg={3}>
            <div className="mb-2">
              <Form.Select
                aria-label="Default select example"
                value={chooseCurrencies}
                onChange={selectCurrencies}
              >
                <option>Please select currency</option>
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
                onChange={insertCurrenciesAmount}
              />
            </InputGroup>
          </Col>
          <Col lg={3}>
            {/* <Button variant="secondary" >Search</Button>{" "} */}
          </Col>
        </Row>
        <Row className="p-3">
          {currenciesData !== null && currenciesData !== undefined && (
            <Table responsive className="table-striped table-hover ">
              <thead className="">
                <tr className="">
                  <th className="bg-info text-secondary p-3 border-end">No</th>
                  <th className="bg-info text-secondary p-3 border-end">
                    Currency Name
                  </th>
                  <th className="bg-info text-secondary p-3">Rate</th>
                </tr>
              </thead>
              <tbody>
                {currenciesData !== null &&
                  currenciesData !== undefined &&
                  Object.keys(currenciesData).map((keyName, i) => {
                    return (
                      <tr key={i}>
                        <td className="w-25 p-3 border-end">{i + 1}</td>
                        <td className="w-25 p-3 border-end">
                          {keyName.slice(3, keyName.length)}
                        </td>
                        <td className="w-25 p-3">{currenciesData[keyName]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          )}
          {currenciesData == null && currenciesData == undefined && (
            <Row className="text-center opacity-25 p-3">
              <label className="fs-3" style={{ opacity: "0.5" }}>
                There is no data
              </label>
            </Row>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Main;
