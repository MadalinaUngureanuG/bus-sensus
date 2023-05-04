import FormData from "@/interfaces/FormData";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Admin() {
  const [ formData, setFormData ] = useState<Array<FormData>>([]);

  useEffect(() => {
    async function fetchFormData() {
      const res = await fetch(`api/admin-data`);
      let adminData: Array<FormData> = await res.json();
      setFormData(adminData);
    }
    fetchFormData();
  }, []);

  function getFormatDate(date: Date) {
    const formatDate = new Date(date);
    return `${formatDate.getFullYear()}-${String(
      formatDate.getMonth() + 1
    ).padStart(2, "0")}-${String(formatDate.getDate()).padStart(2, "0")}`;
  }


  function getFormatHour(date: Date) {
    const formatHour = new Date(date);
    return `${formatHour.getHours()}:${formatHour.getMinutes()}`
  }

  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Bus Number</th>
          <th scope="col">Route</th>
          <th scope="col">Station</th>
          <th scope="col">No of People</th>
          <th scope="col">Date</th>
          <th scope="col">Hour</th>
        </tr>
      </thead>
      <tbody>   
          {formData && formData.map((data:FormData,index:number) => {
            return (
                <tr key={index}>
                    <td scope="column">{index+1}</td>
                    <td>{data.bus_number}</td>
                    <td>{data.bus_route}</td>
                    <td>{data.bus_station}</td>
                    <td>{data.bus_people}</td>
                    <td>{getFormatDate(data.created_at)}</td>
                    <td>{getFormatHour(data.created_at)}</td>
                </tr>
            )
          })}
      </tbody>
    </Table>
  );
}

