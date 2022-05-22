import React from 'react'
import { Circle, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../sass/component/Map.scss'

function Op({ data, caseType, stateData }) {
  const casesTypeColors = {
    confirmedCasesIndian: {
      hex: '#CC1034',
    },
    recovered: {
      hex: '#7dd71d',
    },
    deaths: {
      hex: '#000',
    },
  }

  function sort(n) {
    if (n < 300) {
      return n * 400
    } else if (n < 500) {
      return n * 100
    } else if (n < 2000) {
      return n * 30
    } else if (n < 7000) {
      return n * 15
    } else if (n < 15000) {
      return n * 8
    } else if (n < 25000) {
      return n * 4
    } else if (n < 40000) {
      return n * 5
    } else {
      return n
    }
  }

  return data.map((i, j) => (
    <Circle
      key={j}
      center={[i.lat, i.lng]}
      pathOptions={{
        color: null,
        fillColor: casesTypeColors[caseType].hex,
      }}
      radius={sort(stateData[j].deaths)}
    >
      <Popup>
        <div>Country: {i.loc} </div>
        <div>Confirmed: {stateData[j].confirmedCasesIndian}</div>
        <div>Recoverd: {stateData[j].discharged}</div>
        <div>Deaths: {stateData[j].deaths}</div>
      </Popup>
    </Circle>
  ))
}

function SetViewOnClick({ coords, zoom }) {
  console.log(coords)
  const map = useMap()
  map.setView(coords, zoom)
  return null
}

const Map = ({ coords, zoom, data, caseType, stateData }) => {
  if (stateData.length == []) {
    return <h1>Loading..</h1>
  }

  return (
    <div className="main_map">
      <MapContainer
        center={coords}
        zoom={zoom}
        zoomAnimation={true}
        scrollWheelZoom={true}
        dragging={false}
        style={{ height: '90vh', width: '37vw' }}
      >
        <TileLayer
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick coords={coords} zoom={zoom} />

        <Op data={data} caseType={caseType} stateData={stateData} />
      </MapContainer>
    </div>
  )
}

export default Map
