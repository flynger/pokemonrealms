import "./Home.css";
import { motion } from "framer-motion"
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import HeroParallax from "../components/Home/HeroParallax";
import StartersImg from "../components/Home/StartersImg";

function Home() {
  const initial = {
    opacity: 0,
    filter: "blur(5px)"
  };
  const inView = {
    opacity: 1,
    filter: "blur(0)",
    transform: "translateX(0)"
  }
  const transition = {
    duration: 0.5
  }
  const viewport = {
    margin: "-300px 0px 0px 0px",
    once: true
  }

  return (<>
    <HeroParallax />
    <section>

    </section>
    <section>
      <CardGroup>
        <motion.div className="card" style={{ width: '25rem' }}
          initial={{ ...initial, transform: "translateX(-100%)" }}
          whileInView={inView}
          viewport={viewport}
          transition={transition}>
          <Card.Img variant="top"
            src="https://www.pokemoncenter.com/images/DAMRoot/High/10000/P7607_710-09425_01.jpg" />
          <Card.Body>
            <Card.Title>Explore Your Favorite Regions</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </motion.div>
        <motion.div className="card" style={{ width: '25rem' }}
          initial={{ ...initial, transform: "translateX(100%)" }}
          whileInView={inView}
          viewport={viewport}
          transition={transition}>
          <Card.Img variant="top"
            src="https://listfist.com/wp-content/uploads/pokemon-starter.jpg?ezimgfmt=rs:1240x698/rscb1/ngcb1/notWebP" />
          <Card.Body>
            <Card.Title>Something something pokemon</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </motion.div>
      </CardGroup>
    </section >
    <section>
      <h1 style={{ marginBottom: "3rem" }}>
        Choose Your Starter!
      </h1>
      <StartersImg
        initial={{ ...initial, transform: "translateY(10%)" }}
        inView={inView}
        transition={transition}
        viewport={{ margin: "-100px 0px 0px 0px", once: true }}
        pokemonSrc={{
          pokemon1Src: "https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/900px-0001Bulbasaur.png",
          pokemon2Src: "https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/900px-0004Charmander.png",
          pokemon3Src: "https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/900px-0007Squirtle.png"
        }}
      />
      <StartersImg
        initial={{ ...initial, transform: "translateY(10%)" }}
        inView={inView}
        transition={transition}
        viewport={{ margin: "-100px 0px 0px 0px", once: true }}
        pokemonSrc={{
          pokemon1Src: "https://archives.bulbagarden.net/media/upload/b/bc/0152Chikorita.png",
          pokemon2Src: "https://archives.bulbagarden.net/media/upload/thumb/9/97/0155Cyndaquil.png/900px-0155Cyndaquil.png",
          pokemon3Src: "https://archives.bulbagarden.net/media/upload/f/f7/0158Totodile.png"
        }}
      />
      <StartersImg
        initial={{ ...initial, transform: "translateY(10%)" }}
        inView={inView}
        transition={transition}
        viewport={{ margin: "-100px 0px 0px 0px", once: true }}
        pokemonSrc={{
          pokemon1Src: "https://archives.bulbagarden.net/media/upload/thumb/9/90/0252Treecko.png/375px-0252Treecko.png",
          pokemon2Src: "https://archives.bulbagarden.net/media/upload/thumb/7/7d/0255Torchic.png/375px-0255Torchic.png",
          pokemon3Src: "https://archives.bulbagarden.net/media/upload/thumb/2/26/0258Mudkip.png/900px-0258Mudkip.png"
        }}
      />
    </section>
  </>);
}

export default Home;