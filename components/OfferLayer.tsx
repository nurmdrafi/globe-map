import { FC, useCallback, useEffect, useState } from "react"
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox"
import { IconLayer, ScatterplotLayer } from '@deck.gl/layers'
import { CollisionFilterExtension } from "@deck.gl/extensions"

// Import Hooks
import { useControl } from 'react-bkoi-gl'

const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))

  overlay.setProps(props)
  return null
}

const OfferLayer: FC = (): any => {
  const [data, setData] = useState<any>([])
  const [layers, setLayers] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json')
      const _data = await resp.json()
      setData(() => _data)
    }
    fetchData()
  }, [])

  // Remove Layers
  const _onRemoveLayers = (): void => {
    setLayers([])
  }

  const _onCreateLayers = useCallback(() => {
    const newLayers = [
      new ScatterplotLayer({
        id: 'points',
        data,
        stroked: true,
        filled: true,
        getRadius: 5,
        radiusScale: 1,
        radiusMinPixels: 5,
        radiusMaxPixels: 5,
        lineWidthMinPixels: 2,
        getPosition: (d) => d.coordinates,
        getFillColor: d => [69, 196, 216],
        getLineColor: d => [0, 0, 0],
      }),
      new IconLayer({
        id: 'store',
        data,
        stroked: true,
        getPosition: (d) => d.coordinates,
        getIcon: () => ({
          url: '/store.png',
          width: 150,
          height: 150,
        }),
        getSize: 2,
        alphaCutoff: -1,
        sizeScale: 20,
        pickable: false,
        collisionTestProps: {
          sizeScale: 50
        },
        extensions: [new CollisionFilterExtension()]
      }),
    ]

    setLayers(() => newLayers)
  }, [data]) 

  // On Change Data Create Layers
  useEffect(() => {
    _onCreateLayers()

    return () => {
      _onRemoveLayers()
    }
  }, [data, _onCreateLayers])

  return layers && <DeckGLOverlay layers={ [layers] } />
}

export default OfferLayer
