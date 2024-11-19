# Interactive 3D Globe Map built with Cesium and Resium
This project is a interactive 3D globe map built using `Cesium` and `Resium`. It displays a globe with map styles, various data and allows users to rotate, zoom, and pan the globe.

# Getting Started

## Prerequisites
- Node.js (version 22.4.1 or higher)
- npm or pnpm

## Installation
#### Step 1: Clone the repository:
```bash
git clone https://github.com/nurmdrafi/globe-map.git
```

#### Step 2: Change into the project directory:
```bash
cd globe-map
```

#### Step 3: Install dependencies
```bash
pnpm install
or
npm install
```

#### Step 4: Create a `.env` file in the root directory of the project and add the following line:
```code
NEXT_PUBLIC_CESIUS_ACCESS_TOKEN=your_cesium_access_token
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
```

#### Step 5: Start the develoment server:
```bash
pnpm run dev
or
npm run dev
```

#### Step 6: Open your web browser and navigate to `http://localhost:3000` to view the globe map.

# Implementation
#### Step 1: Install `cesium` and `resium`:

```bash
pnpm install cesium resium \
-D symlink-dir
```

#### Step 2: Configure `next.config.js`
Edit the `next.config.js` file and add the following code:

```js
const webpack = require('webpack');

module.exports = {
  output: "standalone",
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      }),
    );
    return config;
  }
}
```

#### Step 3: Set up Script to Copy Cesium Files
Edit the `package.json` file and add the following script:

```json
{
  "scripts": {
    "postinstall": "symlink-dir node_modules/cesium/Build/Cesium public/cesium"
  }
}
```

#### Step 4: Create a Symbolic Link to Cesium Files
Run the following commands:
```bash
pnpm install
```

#### Step 5: Update `.gitignore`
Adding `/public/cesium` to `.gitignore` is good:
```gitignore
/public/cesium
```

#### Step 6: Add Cesium CSS to Next.js
Add a link tag in head of your `_document.tsx` to load CSS:
```js
<link rel="stylesheet" href="cesium/Widgets/widgets.css" />
```

#### Step 7: Create Component

```ts
import React, { useEffect, useState } from 'react'
import { UrlTemplateImageryProvider, Ion, Cartesian3, Color, } from 'cesium'
import { BillboardGraphics, CameraFlyTo, Entity, ImageryLayer, Scene, Viewer } from 'resium'

const CesiumMap = () => {
  const [locations, setLocations] = useState([])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/data/locations.json')
      const data = await resp.json()
      // console.log(data.locations)
      setLocations(() => data.locations.filter((location: any) => location?.latitude && location?.longitude))
    }
    fetchData()
  }, [])

  // Configure the custom imagery provider
  const imageryProvider = new UrlTemplateImageryProvider({
    // Open Street Map
    // url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",

    // Barikoi Map
    // url: "https://tiles.barikoimaps.dev/styles/osm_barikoi_v2/512/{z}/{x}/{y}.png"
    
    // Maptiler Map
    url: `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${ process.env.NEXT_PUBLIC_MAPTILER_API_KEY }`
  })

  // Set Access token
  Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUS_ACCESS_TOKEN as string

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
            <BillboardGraphics image="marker.png" scale={ 0.1 } />
          </Entity>
        ))} 
      </Viewer>
    </div>

  )
}

export default CesiumMap
```

# Customization

## Imagery Provider
To change the imagery provider, modify the imageryProvider object in the CesiumMap component. You can use different providers such as `OpenStreetMap`, `Barikoi Maps`, or `Maptiler`.