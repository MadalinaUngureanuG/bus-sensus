import Bus from '@/interfaces/DummyData';
import type { NextApiRequest, NextApiResponse } from 'next'

const Data: Bus[] = [
  {
    id: 1,
    bus_number: "5",
    station_from: ["Roman", "Soarelui", "Berzei", "Liceul Informatica", "Spitalul Judetean", "Toamnei", "Liceul Mesota", "Camera de Comert", "Sanitas", "Primarie", "Astra", "Bisericii Romane", "Memorandumului", "Carierei", "Bartolomeu Gara", "Stad. Municipal"],
    station_to: ["Stad. Municipal", "Biserica Bartolomeu", "Carierei", "Memorandului", "Bisericii Romane", "Astra", "Dramatic", "Patria", "Hidro A", "Hidro B", "Spitalul Judetean", "Liceul Informatica", "Berzei", "Pompieri", "Metrom", "Poienelor", "Roman"]
  },
  {
    id: 2,
    bus_number: "2",
    station_from: ["Rulmentul", "N. Labis", "Coresi", "Colegiul N. Titulescu", "Biserica Tractorul", "Mircea Batran", "Onix", "Sanitas", "Primarie", "Livada Postei"],
    station_to: ["Livada Postei", "Dramatic", "Castanilor", "Onix", "Mircea Batran", "Faget", "Tractorul", "Colegiul N. Titulescu", "Coresi", "N. Labis", "Rulmentul"]
  },
  {
    id: 3,
    bus_number: "35",
    station_from: ["Gara Brasov", "Dacia", "Inforstar", "Hidro A", "Hidro B", "Spitalul Judetean", "Liceul Informatica", "Berzei", "Poienelor", "Praktiker", "Metro", "Aurora", "Poiana Darste", "Strand Noua", "Sc. Gen. 9", "Facultativa", "Noua"],
    station_to: ["Noua", "Rozmarinului", "Strand Noua", "Poiana Darste", "Aurora", "Selgros", "Carrefour", "Soarelui", "Berzei", "Liceul Informatica", "Spitalul Judetean", "Toamnei", "Infostar", "Rapid", "Gara Brasov"]
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bus[]>
) {
  res.status(200).json(Data);
}
