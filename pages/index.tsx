import dynamic from "next/dynamic"

const DeckGLMap = dynamic(() => import("../components/DeckGLMap"), { ssr: false })
const CesiumMap = dynamic(() => import("../components/CesiumMap"), { ssr: false })

const Home = () => {
  return (
    <>
      {/* <DeckGLMap /> */}
      {/* <GlobeMap /> */}
      <CesiumMap />
    </>
  )
}

export default Home
