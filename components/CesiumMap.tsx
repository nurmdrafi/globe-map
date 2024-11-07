// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import { UrlTemplateImageryProvider, Ion, Cartesian3 } from 'cesium'
import { BillboardGraphics, Camera, CameraFlyTo, Entity, ImageryLayer, SkyBox, Viewer } from 'resium'
import { CESIUS_ACCESS_TOKEN } from '../app.config'

const CesiumMap = () => {
  const locations = [
    { city: "Dhaka", latitude: 23.8103, longitude: 90.4125 },
    { city: "New York", latitude: 40.7128, longitude: -74.0060 },
    { city: "London", latitude: 51.5074, longitude: -0.1278 },
    { city: "Paris", latitude: 48.8566, longitude: 2.3522 },
    { city: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
    { city: "Berlin", latitude: 52.5200, longitude: 13.4050 },
    { city: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    { city: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    { city: "Rome", latitude: 41.9028, longitude: 12.4964 },
    { city: "Moscow", latitude: 55.7558, longitude: 37.6176 },
    { city: "Cairo", latitude: 30.0444, longitude: 31.2357 },
  ]

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
        imageryProvider={ false } // Hide the default imagery provider
        baseLayerPicker={ false } // Hide the default base layer
      >
        <ImageryLayer imageryProvider={ imageryProvider } />
        <CameraFlyTo duration={ 5 } destination={ Cartesian3.fromDegrees(90, 25, 1000000 * 9) } />

        {locations.map((location, index) => (
          <Entity
            key={ index }
            position={ Cartesian3.fromDegrees(location.longitude, location.latitude, 100) }
          >
            <BillboardGraphics image="marker.png" scale={ 1 } />
          </Entity>
        ))}
        <SkyBox 
          sources={{
            positiveX: '/skybox/skybox_px.jpg',
            negativeX: '/skybox/skybox_nx.jpg',
            positiveY: '/skybox/skybox_py.jpg',
            negativeY: '/skybox/skybox_ny.jpg',
            positiveZ: '/skybox/skybox_pz.jpg',
            negativeZ: '/skybox/skybox_nz.jpg',
          }}
        />
      </Viewer>
    </div>

  )
}

export default CesiumMap
