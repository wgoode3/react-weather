import React, { useEffect, useState } from 'react';
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios';

const key = "get your own key at openweathermap.org";

const Dojo = (props) => {

  const [errors, setErrors] = useState(false);
  const [temp, setTemp] = useState(0);
  
  useEffect( () => {
    axios.get(`https://openweathermap.org/data/2.5/weather?q=${props.city}&appid=${key}`)
    .then(res => {
      setErrors(false);
      setTemp(Math.round(1.8*res.data.main.temp+32))
    })
    .catch(err => {
      setErrors(true);
      console.log(err)
    });
  }, [props.city]);
  
  return (
    <>
    { 
      errors ?
      <h1>These are not the droids you're looking for</h1> :
      <h1>{props.city} - {temp}F</h1> 
    }
    </>
  );
}
  
function App() {
  
  const [q, setQ] = useState("");

  const getWeather = (e) => {
    e.preventDefault();
    navigate(`/dojo/${q}`);
  }

  return (
    <div className="App">
      <h1>Routing is cool</h1>
      <Link to="/dojo/Chicago, US">Chicago</Link>
      &nbsp;|&nbsp;
      <Link to="/dojo/Tulsa, US">Tulsa</Link>
      &nbsp;|&nbsp;
      <Link to="/dojo/Washington DC, US">DC</Link>
      <form onSubmit={ getWeather }>
        <input type="text" onChange={(e) => setQ(e.target.value)} />
        <input type="submit" value="Get The Weather!" />
      </form>
      <Router>
        <Dojo path="/dojo/:city" />
      </Router>
    </div>
  );
}

export default App;
