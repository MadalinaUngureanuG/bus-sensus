import getFormatDate from '@/helpers/getDateFunction';
import getFormatHour from '@/helpers/getHourFunction';
import FormData from '@/interfaces/formData';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { serverUrl } from '../../../config';

export default function Admin () {
  const [formData, setFormData] = useState<Array<FormData>>([]);

  // Fetch all data introduced in form by all users
  useEffect(() => {
    async function fetchFormData () {
      const res = await fetch(`${serverUrl}bussensus/reports`);
      let adminData: Array<FormData> = await res.json();
      setFormData(adminData);
    }
    fetchFormData();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Bus Name</th>
          <th scope='col'>Route</th>
          <th scope='col'>Station</th>
          <th scope='col'>No of People</th>
          <th scope='col'>Date</th>
          <th scope='col'>Hour</th>
        </tr>
      </thead>
      <tbody>
        {formData &&
          formData.map((data: FormData, index: number) => {
            return (
              <tr key={index}>
                <td scope='column'>{index + 1}</td>
                <td>{data.busId}</td>
                <td>{data.routeId}</td>
                <td>{data.stationId}</td>
                <td>{data.noOfPassengers}</td>
                <td>{getFormatDate(data.dateTime)}</td>
                <td>{getFormatHour(data.dateTime)}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}
