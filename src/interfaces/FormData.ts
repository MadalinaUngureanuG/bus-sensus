export default interface FormData {
    bus_number: string,
    bus_route: string;
    bus_station: string;
    bus_people: number;
    created_at: Date;
    created_by?: number;
}