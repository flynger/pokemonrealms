import { motion, useScroll, useTransform } from "framer-motion"
import "../../pages/Home.css";
import { useRef } from "react";
import background from "./background2.png";
import bottomImg from "./bottomImg2.png";
// import Button from "react-bootstrap/esm/Button";

function HeroParallax() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

    return (<>
        <section className="position-relative hero" ref={ref}>
            <motion.h1 className="position-relative z-1"
                style={{
                    y: textY,
                    color: "WHITE",
                    fontWeight: "bold",
                    fontSize: "5rem",
                    marginBottom: "12rem"
                }}>
                Pokémon Realms
            </motion.h1>
            {/* <p>We are currently working on the game. Please try again later.</p>
            <Button size="lg">Play</Button> */}
            <motion.div className="position-absolute z-0"
                style={{
                    y: backgroundY,
                    inset: "0px",
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover"
                }}
            />
            <div className="position-absolute z-2"
                style={{
                    inset: "0px",
                    backgroundImage: `url(${bottomImg})`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover"
                }}
            />
        </section >
    </>);
}

export default HeroParallax;