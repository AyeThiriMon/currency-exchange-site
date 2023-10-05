import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Table } from "react-bootstrap";
import './Form.css';

function AllCurrencyRateTable(props) {
  let { currenciesData } = props;
  return (
    <Row className="">
      {currenciesData !== null && currenciesData !== undefined && (
        <Table responsive className="table-striped table-hover ">
          <thead className="sticky-top">
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
  );
}

export default AllCurrencyRateTable;
