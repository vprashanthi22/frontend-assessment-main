import React, { useEffect, useState } from 'react';
import './App.css';

type SortOrder = 'asc' | 'desc' | '';
interface Country {
  confirmed: number;
  recovered: number;
  deaths: number;
  country: string;
  population: number;
  areaInSqKm: number;
  lifeExpectancy: number;
  elevationMeters: number;
  continent: string;
  abbreviation: string;
  location: string;
  capitalCity: string;
  lat: number;
  lng: number;
}
function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortKey, setSortKey] = useState<keyof Country | ''>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('');

  useEffect(() => {
    fetch('/country.json') .then(res => res.json())
    .then(data => setCountries(data))
    .catch(err => console.error('API Error:', err));
  }, []);

  const handleSort = (key:any) => {
    // console.log("in...",key);
    let newOrder: SortOrder = 'asc';
    if (sortKey === key && sortOrder === 'asc') newOrder = 'desc';
    else if (sortKey === key && sortOrder === 'desc') newOrder = '';

    setSortKey(newOrder ? key : '');
    setSortOrder(newOrder);
  };

  const sortedData = [...countries].sort((a, b) => {
    if (!sortKey || sortOrder === '') return 0;

    const valA = a[sortKey];
    const valB = b[sortKey];
    // console.log('valA:',valA,'valB:',valB);
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return 0;
  });

  return (
    <table border={1}>
      <thead>
        <tr>
          <th onClick={() => handleSort('country')}>Country</th>
          <th onClick={() => handleSort('population')}>Population</th>
          <th onClick={() => handleSort('deaths')}>Deaths</th>
          <th onClick={() => handleSort('recovered')}>Recovered</th>
          <th onClick={() => handleSort('lat')}>Lat.</th>
          <th onClick={() => handleSort('lng')}>Lng.</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((c, index) => (
          <tr key={index}>
            <td>{c.country}</td>
            <td>{c.population}</td>
            <td>{c.deaths}</td>
            <td>{c.recovered}</td>
            <td>{c.lat}</td>
            <td>{c.lng}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
