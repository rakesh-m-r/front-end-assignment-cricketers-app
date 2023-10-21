import './App.css';
import getPlayers from './API/get-players';
import { useEffect, useState } from 'react';
import { Cricketers } from './Containers/Cricketers';
import { DetailsPage } from './Containers/DetailsPage';

function App() {
  const [cricketersList, setCricketersList] = useState([]);
  const [detailsPage, setDetailsPage] = useState(null);
  function APICall() {
    getPlayers().then(data => setCricketersList(data))
    
  }
  useEffect(() => { APICall() }, [])
  return (
    <div className="App">
      {detailsPage ? <DetailsPage data={detailsPage} setDetails={setDetailsPage} /> :
        <Cricketers cricketersList={cricketersList} setDetails={setDetailsPage} />}

    </div>
  );
}

export default App;
