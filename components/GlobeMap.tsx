/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */

// Resources
// https://visibleearth.nasa.gov/collection/1484/blue-marble
// https://www.solarsystemscope.com/textures/
      
// @ts-nocheck
import React, { useEffect, useLayoutEffect, useCallback, useRef, useMemo, useState, FC } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from "three"

const GlobeMap: FC = () => {
  const globeEl = useRef()
  const textureLoader = useMemo(() => new THREE.TextureLoader(), [])
  const [places, setPlaces] = useState([])
  const [rotation, setRotation] = useState(true)

  // Generate Random Data
  const N = 30
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
  }))

  // Rotate Clouds
  const rotateClouds = useCallback((clouds) => {
    function rotate() {
      clouds.rotation.y += -0.006 * Math.PI / 180
      requestAnimationFrame(rotate)
    }
    rotate()
  }, [])

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false
      globeEl.current.controls().autoRotateSpeed = 1
      globeEl.current?.pointOfView({ lat: 25, lng: 80, altitude: 2 }, 0)
      globeEl.current.controls().update()

      // Clouds
      // const CLOUDS_IMG_URL = '/clouds.png'
      // const CLOUDS_ALT = 0.004
      // const CLOUDS_RADIUS_SCALE = 1
      // textureLoader.load(CLOUDS_IMG_URL, (cloudsTexture) => {
      //   const clouds = new THREE.Mesh(
      //     new THREE.SphereGeometry(globeEl.current.getGlobeRadius() * (1 + CLOUDS_ALT) * CLOUDS_RADIUS_SCALE, 75, 75),
      //     new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true }),
      //   )
      //   clouds.scale.set(1.015, 1.015, 1.015)
      //   globeEl.current.scene().add(clouds)
      //   rotateClouds(clouds)
      // })
    }
  }, [globeEl, rotateClouds, textureLoader])

  return (

    <Globe
      ref={ globeEl }
      globeImageUrl="/8k_earth_specular_map.webp" // "/world.jpg"
      backgroundColor="#04172b"
      // backgroundImageUrl="white-background.jpg" // "/night-sky.jpg"
      htmlElementsData={ gData }
      atmosphereAltitude={ 0.2 }
      htmlElement={ d => {
        const el = document.createElement('div')
        el.innerHTML = "<img src='/marker.png' width='50px' height='50px'>"
        el.style.width = `30px`
        el.style['pointer-events'] = 'auto'
        el.style.cursor = 'pointer'
        return el
      } }
    />
  )
}

export default GlobeMap
