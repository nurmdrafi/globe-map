/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
// @ts-nocheck
import React, { useEffect, useCallback, useRef, useMemo, useState, FC } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from "three"

const GlobeMap: FC = () => {
  const globeEl = useRef()
  const textureLoader = useMemo(() => new THREE.TextureLoader(), [])
  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial()
    material.bumpScale = 10
    return material
  }, [])
  const [places, setPlaces] = useState([])
  const [rotation, setRotation] = useState(true)

  // useEffect(() => {
  //   // load data
  //   fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_populated_places_simple.geojson').then(res => res.json())
  //     .then(({ features }) => setPlaces(features));
  // }, []);

  // Generate Random Data
  const N = 30
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
  }))

  // Load Globe Material
  const loadGlobeMaterial = useCallback(() => {
    textureLoader.load("/bump-large.jpg", (texture) => {
      globeMaterial.bumpMap = texture
    })
  }, [textureLoader, globeMaterial])

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
      globeEl.current.controls().autoRotate = true
      globeEl.current.controls().autoRotateSpeed = 1
      globeEl.current.pointOfView({ altitude: 2.5 }, 500)
      globeEl.current.controls().update()

      loadGlobeMaterial()

      const CLOUDS_IMG_URL = '/clouds.png'
      const CLOUDS_ALT = 0.004
      textureLoader.load(CLOUDS_IMG_URL, (cloudsTexture) => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(globeEl.current.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        )
        globeEl.current.scene().add(clouds)
        rotateClouds(clouds)
      })
    }
  }, [globeEl, loadGlobeMaterial, rotateClouds, textureLoader])

  return (
    <Globe
      ref={ globeEl }
      globeMaterial={ globeMaterial }
      globeImageUrl="/world-high.jpg" // https://visibleearth.nasa.gov/collection/1484/blue-marble
      bumpImageUrl="/bump-large.jpg"
      backgroundImageUrl="/night-sky.png"
      htmlElementsData={ gData }
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
