import dynamic from "next/dynamic"

// Import Components
const CesiumMap = dynamic(() => import("../components/CesiumMap"), { ssr: false })

const Home = () => {
  return (
    <CesiumMap />
  )
}

export default Home
