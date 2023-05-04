import FormData from '@/interfaces/FormData';
import type { NextApiRequest, NextApiResponse } from 'next'

const Data: FormData[] = [
    {
        bus_number: "5",
        bus_route: "Roman",
        bus_station: "Berzei",
        bus_people: 25,
        created_at: new Date(),
    },
    {
        bus_number: "2",
        bus_route: "Rulmentul",
        bus_station: "Dramatic",
        bus_people: 12,
        created_at: new Date(),
    },
    {
        bus_number: "35",
        bus_route: "Gara Brasov",
        bus_station: "Rozmarinului",
        bus_people: 2,
        created_at: new Date(),
    }
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<FormData[]>
  ) {
    res.status(200).json(Data);
  }