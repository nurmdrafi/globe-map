/* eslint-disable prefer-destructuring */
import { FC, useRef } from "react"

// Import Components
import { Map } from "react-bkoi-gl"

// Import Styles
import "react-bkoi-gl/styles"

// Import Types
import type { MapRef } from "react-bkoi-gl"

// Import Layers
import OfferLayer from "./OfferLayer"

const DeckGLMap: FC = () => {
  // States
  const mapRef: any = useRef<MapRef>(null)
  const mapStyle = `https://map.barikoi.com/styles/osm-liberty/style.json?key=MjYxOTo0Rko3SlhBVlRJ`
  const initialViewState = {
    longitude: -122.4,
    latitude: 37.74,
    minZoom: 1,
    maxZoom: 35,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    antialias: true,
  }

  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        position: "absolute",
        background: ""
      }}
    >
      <Map
        ref={ mapRef }
        mapStyle={ mapStyle }
        style={{ width: "100%", height: "100%", position: "relative" }}
        initialViewState={ initialViewState }
        doubleClickZoom={ false }
        dragRotate={ false }
        attributionControl={ false }
      >
        <OfferLayer />
      </Map>
    </div>
  )
}

export default DeckGLMap
