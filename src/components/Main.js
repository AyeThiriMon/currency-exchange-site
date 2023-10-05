import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import UserActionPanel from "./UserActionPanel";
import AllCurrencyRateTable from "./AllCurrencyRateTable";

function Main() {
  const [allCurrencies, setAllCurrencies] = React.useState(null);
  const [chooseCurrencies, setChooseCurrencies] = React.useState("USD");
  const [currenciesData, setCurrenciesData] = React.useState(null);
  const [amount, setAmount] = React.useState(1);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const currenciesDataRef = React.useRef(0);

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

    // initially load list of currencies amount
    axios
      .get(
        "http://apilayer.net/api/live?access_key=1736829a343ea87a5e6b18cb2d5ddea7&currencies=AED,AFN,ALL,AMD,ANG,AOA,ARS,AUD,AWG,AZN,BAM,BBD,BDT,BGN,BHD,BIF,BMD,BND,BOB,BRL,BSD,BTC,BTN,BWP,BYN,BZD,CAD,CDF,CHF,CLF,CLP,CNH,CNY,COP,CRC,CUC,CUP,CVE,CZK,DJF,DKK,DOP,DZD,EGP,ERN,ETB,EUR,FJD,FKP,GBP,GEL,GGP,GHS,GIP,GMD,GNF,GTQ,GYD,HKD,HNL,HRK,HTG,HUF,IDR,ILS,IMP,INR,IQD,IRR,ISK,JEP,JMD,JOD,JPY,KES,KGS,KHR,KMF,KPW,KRW,KWD,KYD,KZT,LAK,LBP,LKR,LRD,LSL,LYD,MAD,MDL,MGA,MKD,MMK,MNT,MOP,MRU,MUR,MVR,MWK,MXN,MYR,MZN,NAD,NGN,NIO,NOK,NPR,NZD,OMR,PAB,PEN,PGK,PHP,PKR,PLN,PYG,QAR,RON,RSD,RUB,RWF,SAR,SBD,SCR,SDG,SEK,SGD,SHP,SLL,SOS,SRD,SSP,STD,STN,SVC,SYP,SZL,THB,TJS,TMT,TND,TOP,TRY,TTD,TWD,TZS,UAH,UGX,UYU,UZS,VEF,VES,VND,VUV,WST,XAF,XAG,XAU,XCD,XDR,XOF,XPD,XPF,XPT,YER,ZAR,ZMW,ZWL&source=USD&format1"
      )
      .then((response) => {
        if (!response["data"]["success"]) {
          setErrorMsg(response["data"]["error"]["info"]);
        } else {
          setCurrenciesData(response["data"]["quotes"]);
          currenciesDataRef.current = response["data"];
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!allCurrencies) return null;

  // select currency name
  const selectCurrencies = async (e) => {
    setChooseCurrencies(e.target.value);
    let search_currency = allCurrencies
      .toString()
      .split(e.target.value + ",")
      .join("");
    let url =
      "http://apilayer.net/api/live?access_key=1736829a343ea87a5e6b18cb2d5ddea7&currencies=" +
      search_currency +
      "&source=" +
      e.target.value +
      "&format1";
    axios
      .get(url)
      .then((response) => {
        if (!response["data"]["success"]) {
          setErrorMsg(response["data"]["error"]["info"]);
        } else {
          setCurrenciesData(response["data"]["quotes"]);
          currenciesDataRef.current = response["data"];
          if (currenciesDataRef["current"] != 0) {
            let result = Object.keys(
              currenciesDataRef["current"]["quotes"]
            ).reduce((acc, key) => {
              acc[key] = currenciesDataRef["current"]["quotes"][key] * amount;
              return acc;
            }, {});
            setCurrenciesData(result);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const insertCurrenciesAmount = (e) => {
    setAmount(e.target.value);
    if (currenciesDataRef["current"] != 0) {
      let result = Object.keys(currenciesDataRef["current"]["quotes"]).reduce(
        (acc, key) => {
          acc[key] =
            currenciesDataRef["current"]["quotes"][key] * e.target.value;
          return acc;
        },
        {}
      );
      setCurrenciesData(result);
    }
  };

  return (
    <Container>
      <Row className="text-center p-5">
        <Col>
          <h1>Currency Exchange Rate</h1>
        </Col>
      </Row>
      <div className="shadow p-3 mb-3 bg-body rounded border-top">
        {errorMsg !== null && errorMsg !== undefined && (
          <Row
            className="text-center p-1 m-3 alert alert-danger text-white"
            style={{
              backgroundColor: "red",
              opacity: "0.5",
              borderRadius: "10px",
            }}
          >
            <Col>
              <h5 className="">{errorMsg}</h5>
            </Col>
          </Row>
        )}

        <UserActionPanel
          chooseCurrencies={chooseCurrencies}
          selectCurrencies={selectCurrencies}
          allCurrencies={allCurrencies}
          amount={amount}
          insertCurrenciesAmount={insertCurrenciesAmount}
        />
        <AllCurrencyRateTable currenciesData={currenciesData} />
      </div>
    </Container>
  );
}

export default Main;
