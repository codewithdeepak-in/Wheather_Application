import { useState } from "react";
import styled from "styled-components";

const App = () => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);

  function handleChange(e) {
    setSearch(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=54b391959bd7442c80662327232610&q=${search}&aqi=no`
    );
    const data = await response.json();
    console.table(Object.values(data));
    setData(Object.values(data));
  }
  return (
    <Container>
      <div className="main_container">
        <div>Wheather Applicaton</div>
        <form>
          <input
            type="text"
            placeholder="Search Wheather"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Search</button>
        </form>
        {data ? (
          <div className="form_data">
            <div className="section_2">
              <img src={`https:${data[1].condition.icon}`} alt="img" />
              <p>{data[1].condition.text}</p>
            </div>
            <div className="section_1">
              <div>{data[0].name}</div>
              <div>{data[0].region}</div>
            </div>
            <div className="section_1">
              <div>{data[0].tz_id}</div>
              <div>{data[0].country}</div>
            </div>
            <div className="section_2">{data[0].localtime}</div>
          </div>
        ) : (
          <div className="search">Search for data </div>
        )}
      </div>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;

  .main_container {
    background-color: #4158d0;
    background-image: linear-gradient(
      43deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    );
    color: white;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 20px;
  }
  form {
    margin-top: 20px;
    display: flex;
    width: 100%;
  }
  form input {
    height: 35px;
    width: 100%;
    padding: 0 12px;
  }
  form button {
    height: 38px;
    background-color: #333;
    color: white;
  }
  .form_data {
    width: 100%;
  }
  .section_1 {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
  }
  .section_1 div {
    width: 50%;
  }
  .section_1 div:first-child {
    text-align: left;
  }
  .section_1 div:last-child {
    text-align: right;
  }
  .section_2 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .search {
    margin-top: 15px;
  }
`;
