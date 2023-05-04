import Bus from '@/interfaces/DummyData';
import FormData from '@/interfaces/FormData';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const [busData, setBusData] = useState<Array<Bus>>([]);
const [selectedBus, setSelectedBus] = useState<Bus>({} as Bus);
const [formData, setFormData] = useState<FormData>({
  bus_number:"",
  bus_route: "",
  bus_station: "",
  bus_people: 0,
  created_at:new Date(),
  created_by:1
});

  useEffect(() => {
    async function fetchBusData() {
      const res = await fetch(`api/bus-data`)
      let busData: Array<Bus> = await res.json();
      setBusData(busData);
    }
    fetchBusData();
  }, []);

  function onBusChange(data: any) {
    const bus = JSON.parse(data.target.value)
    setSelectedBus(bus);
    formData.bus_number = bus.bus_number;
    formData.bus_route = "";
    formData.bus_station = "";
    formData.bus_people = 0;
    setFormData({...formData});
    console.log(formData);
  } 

  function onRouteChange(data: any) {
    formData.bus_route = data.target.value;
    setFormData({...formData});
  }

  function onStationChange(data: any) {
    formData.bus_station = data.target.value;
    setFormData({...formData});
  }

  function getStation(): Array<string> {
    if (selectedBus.station_from[0] === formData.bus_route) {
      return selectedBus.station_to;
    } 
    return selectedBus.station_from;
  }

  function onNrPeopleChange(data: any) {
    formData.bus_people = data.target.valueAsNumber;
    setFormData({...formData});
    console.log(formData);
  }

  async function saveData(e:any) {
    e.preventDefault();
    formData.created_at = new Date();
    formData.created_by = 1;
    const res = await fetch(`api/form-data`, {
      method: "POST",
    body: JSON.stringify(formData)
    })
  }

  return (
    <>
    <h1 className="text-center mb-5">Welcome to Bus Sensus</h1>
    <form onSubmit={saveData}>
      <div className="mb-4 mx-1">
        <label htmlFor="busNumber" className="form-label">Bus number</label>
        <select className="form-select" aria-label="Bus number" id="busNumber" onChange={(event) => onBusChange(event)}>
         <option value={"{}"}>Please select your bus</option>
         {busData && busData.map((bus) => {
          return (
            <option value={JSON.stringify(bus)} key={bus.id}>
              {bus.bus_number}
            </option>
          )
         })}
        </select>
      </div>
      <div className="mb-4 mx-1">
        <label htmlFor="busRoute" className="form-label">Bus route</label>
        <select className="form-select" aria-label="Bus route" id="busRoute" name="bus_route" value={formData.bus_route} onChange={(event) => onRouteChange(event)}>
         <option value={""}>Please select your route</option>
         {formData.bus_number ? (
          <>
          <option value={selectedBus.station_from[0]}>{selectedBus.station_from[0]}</option>
          <option value={selectedBus.station_to[0]}>{selectedBus.station_to[0]}</option>
          </>
         ) : ( "" )}
        </select>
      </div>
      <div className="mb-4 mx-1">
        <label htmlFor="busStation" className="form-label">Station</label>
        <select className="form-select" aria-label="Station" id="busStation" name="bus_station" value={formData.bus_station} onChange={(event) => onStationChange(event)}>
         <option value={""}>Please select your station</option>
         {formData.bus_number && formData.bus_route ? (
          getStation().map((station, index:number) => {
            return (
              <option value={station} key={index}>
                {station}
              </option>
            )
          })
         ) : ( "" )}
        </select>
      </div>
      <div className="mb-4 mx-1 d-flex flex-column">
        <label htmlFor="numberOfPeople" className="form-label">No. of people in the bus</label>
        <input type="number" id="numberOfPeople" name="bus_people" value={formData.bus_people} aria-label="No. of people in the bus" onChange={(event) => onNrPeopleChange(event)}/>
      </div>
      <div className="d-flex flex-row-reverse">
        <button className="submit-btn" type="submit">Submit</button>
      </div>
    </form>
    </>
  )
}
