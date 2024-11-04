import dynamic from "next/dynamic"

const GlobeMap = dynamic(() => import("../components/GlobeMap"), { ssr: false })
const OfferMap = dynamic(() => import("../components/OfferLayer"), { ssr: false })
const DeckGLMap = dynamic(() => import("../components/DeckGLMap"), { ssr: false })

const Home = () => {
  return (
    <>
      <DeckGLMap />
    </>
  )
}

export default Home
