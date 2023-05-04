import { Container } from "react-bootstrap";
import Meta from "./Meta";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Meta />
        <Container className="container-lg container-sm">
            {children}
        </Container>
        </>
    )
}