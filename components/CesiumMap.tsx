import React, { useEffect, useState } from 'react'
import { UrlTemplateImageryProvider, Ion, Cartesian3, Color, } from 'cesium'
import { BillboardGraphics, CameraFlyTo, Entity, ImageryLayer, Scene, Viewer } from 'resium'
import { CESIUS_ACCESS_TOKEN } from '../app.config'

const CesiumMap = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/data/locations.json')
      const data = await resp.json()
      // console.log(data.locations)
      setLocations(() => data.locations.filter((location: any) => location?.latitude && location?.longitude))
    }
    fetchData()
  }, [])
  // console.log(locations)
  // Configure the custom imagery provider
  const imageryProvider = new UrlTemplateImageryProvider({
    // url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    // url: "https://tiles.barikoimaps.dev/styles/osm_barikoi_v2/512/{z}/{x}/{y}.png"
    url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=gQ7deYpNrAaZJt7X1omk"
  })

  // Set Access token
  Ion.defaultAccessToken = CESIUS_ACCESS_TOKEN

  return (
    <div className='map-container'>
      <Viewer 
        full 
        // @ts-ignore
        imageryProvider={ false } // Hide the default imagery provider
        baseLayerPicker={ false } // Hide the default base layer
        skyBox={ false }
      >
        <Scene backgroundColor={ Color.LIGHTCYAN } />
        <ImageryLayer imageryProvider={ imageryProvider } />
        <CameraFlyTo duration={ 5 } destination={ Cartesian3.fromDegrees(90, 25, 1000000 * 9) } />
        {locations.map((location: any, index: number) => (
          <Entity
            key={ index }
            position={ Cartesian3.fromDegrees(location.longitude, location.latitude, 100) }
          >
            <BillboardGraphics image="marker.png" scale={ 1 } />
          </Entity>
        ))} 
      </Viewer>
    </div>

  )
}

export default CesiumMap
