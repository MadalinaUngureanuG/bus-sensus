import { serverUrl } from '../../config';
import Bus from '@/interfaces/bus';
import FormData from '@/interfaces/formData';
import Route from '@/interfaces/route';
import Station from '@/interfaces/station';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home () {
  const [busData, setBusData] = useState<Array<Bus>>([]);
  const [routeData, setRouteData] = useState<Array<Route>>([]);
  const [stationData, setStationData] = useState<Array<Station>>([]);
  const [selectedBus, setSelectedBus] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(init());

  // Fetch all data about buses
  useEffect(() => {
    async function fetchBusData () {
      const res = await fetch(`${serverUrl}bussensus/buses`);
      let busData: Array<Bus> = await res.json();
      setBusData(busData);
    }
    fetchBusData();
  }, []);

  function init () {
    return {
      busId: '',
      routeId: '',
      stationId: '',
      noOfPassengers: 0
    };
  }

  async function onBusChange (event: React.ChangeEvent<HTMLSelectElement>) {
    const busId: string = event.target.value;
    setSelectedBus(busId);
    setFormData({
      busId: busId,
      routeId: '',
      stationId: '',
      noOfPassengers: 0
    });

    // Fetch routes by the id of the bus selected
    const res = await fetch(`${serverUrl}bussensus/buses/${busId}/routes`);
    let routeData: Array<Route> = await res.json();
    setRouteData(routeData);
  }

  async function onRouteChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setFormData((oldData) => ({ ...oldData, routeId: event.target.value }));

    // Fetch stations by the id of the bus and route selected
    const routeId = event.target.value;
    const busId = selectedBus;
    const res = await fetch(`${serverUrl}bussensus/buses/${busId}/routes/${routeId}/stations`);
    let stationData: Array<Station> = await res.json();
    setStationData(stationData);
  }

  function onStationChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setFormData((oldData) => ({ ...oldData, stationId: event.target.value }));
  }

  function onNrPeopleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((oldData) => ({ ...oldData, noOfPassengers: event.target.valueAsNumber }));
  }

  // Fetch all saved data to a report
  async function saveData (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`${serverUrl}bussensus/reports`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData)
    });
    setFormData(init());
    setRouteData([]);
    setStationData([]);
    toast('Successfully Saved!');
  }

  return (
    <>
      <h1 className='text-center mb-5'>Welcome to Bus Sensus</h1>
      <form onSubmit={saveData}>
        <div className='mb-4 mx-1'>
          <label htmlFor='busName' className='form-label'>
            Bus name
          </label>
          <select
            className='form-select'
            aria-label='busName'
            id='busName'
            name='busName'
            value={formData.busId}
            onChange={onBusChange}
            required
          >
            <option value={''} disabled>
              Please select your bus
            </option>
            {busData &&
              busData.map((bus) => {
                return (
                  <option value={bus.busId} key={bus.busId}>
                    {bus.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className='mb-4 mx-1'>
          <label htmlFor='busRoute' className='form-label'>
            Bus route
          </label>
          <select
            className='form-select'
            aria-label='busRoute'
            id='busRoute'
            name='busRoute'
            value={formData.routeId}
            onChange={onRouteChange}
            required
          >
            <option value={''} disabled>
              Please select your route
            </option>
            {routeData &&
              routeData.map((route) => {
                return (
                  <option value={route.routeId} key={route.routeId}>
                    {route.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className='mb-4 mx-1'>
          <label htmlFor='busStation' className='form-label'>
            Station
          </label>
          <select
            className='form-select'
            aria-label='Station'
            id='busStation'
            name='busStation'
            value={formData.stationId}
            onChange={onStationChange}
            required
          >
            <option value={''} disabled>
              Please select your station
            </option>
            {stationData &&
              stationData.map((station) => {
                return (
                  <option value={station.stationId} key={station.stationId}>
                    {station.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className='mb-4 mx-1 d-flex flex-column'>
          <label htmlFor='noOfPassengers' className='form-label'>
            No. of people in the bus
          </label>
          <input
            type='number'
            id='noOfPassengers'
            name='noOfPassengers'
            value={formData.noOfPassengers}
            aria-label='No. of people in the bus'
            onChange={(event) => onNrPeopleChange(event)}
            required
          />
        </div>
        <div className='d-flex flex-row-reverse'>
          <button className='submit-btn' type='submit'>
            Submit
          </button>
          <ToastContainer />
        </div>
      </form>
    </>
  );
}
