import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../../pages/Home.css";
import { motion } from "framer-motion";


function StartersImg({ initial, inView, transition, viewport, pokemonSrc: { pokemon1Src, pokemon2Src, pokemon3Src } }) {
    console.log(pokemon1Src)
    return (
        <Container style={{ marginBottom: "2rem" }}>
            <Row>
                <Col />
                <Col>
                    <motion.img className="rounded-circle fluid" src={pokemon1Src} style={{ maxWidth: "80%" }}
                        initial={initial}
                        whileInView={inView}
                        transition={{ ...transition, delay: 0.2 }}
                        viewport={viewport}
                    />
                </Col>
                <Col>
                    <motion.img className="rounded-circle fluid" src={pokemon2Src} style={{ maxWidth: "80%" }}
                        initial={initial}
                        whileInView={inView}
                        transition={{ ...transition, delay: 0.4 }}
                        viewport={viewport}
                    />
                </Col>
                <Col>
                    <motion.img className="rounded-circle fluid" src={pokemon3Src} style={{ maxWidth: "80%" }}
                        initial={initial}
                        whileInView={inView}
                        transition={{ ...transition, delay: 0.6 }}
                        viewport={viewport}
                    />
                </Col>
                <Col />
            </Row>
        </Container>
    );
}

export default StartersImg;