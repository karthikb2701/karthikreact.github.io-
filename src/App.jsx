import React, { useEffect, useState } from 'react'
import { fetchCord, fetchData } from './api'

import Dropdown from './component/Dropdown'
import Graph from './component/Graph'
import Map from './component/Map'
import Nav from './component/Nav'
import CountUp from 'react-countup'
import './sass/component/Infobox.scss'
import './sass/component/App.scss'

const App = () => {
  const [stateData, setStateData] = useState([])
  const [globalData, setGlobalData] = useState([])
  const [data, setData] = useState([])
  const [mapData, setMapData] = useState([])
  const [cord, setCord] = useState([20.5937, 78.9629])
  const [zoom, setZoom] = useState(5)
  const [caseType, setCaseType] = useState('confirmedCasesIndian')

  const arr = []
  useEffect(() => {
    const getData = async () => {
      const {
        regional,
        summary: {
          confirmedCasesForeign,
          confirmedCasesIndian,
          deaths,
          discharged,
        },
      } = await fetchData()
      const data = await fetchCord()
      setMapData(data)
      setStateData(regional)
      setGlobalData({
        confirmedCasesForeign,
        confirmedCasesIndian,
        deaths,
        discharged,
      })
      setData([confirmedCasesForeign, confirmedCasesIndian, deaths, discharged])
    }
    getData()
  }, [])

  useEffect(() => {}, [zoom])
  stateData.map(({ confirmedCasesIndian, discharged, deaths }, i) => {
    arr.push({ confirmedCasesIndian, discharged, deaths })
  })
  //If data is not loaded confirmedCasesIndian death discharged

  //handling data
  function handleData(event) {
    const value = event.target.value
    const arr = value.split(',')

    if (value == 'India') {
      const {
        deaths: deaths,
        discharged: recovered,
        confirmedCasesIndian: active,
      } = globalData
      setData(['op', active, recovered, deaths])
      setCord([20.5937, 78.9629])
      setZoom(5)
    } else {
      setData(arr)
      mapData.filter(({ loc, lat, lng }) => {
        if (arr[0] == loc) {
          const l1 = parseFloat(lat)
          const l2 = parseFloat(lng)
          setCord([l1, l2])
          setZoom(6)
        }
      })
    }
  }

  if (globalData.length == []) {
    return <h1>Loading..</h1>
  }

  return (
    <div>
      {/* Header  */}

      <Nav />
      <div className="main">
        <div className="content">
          <div className="left">
            {/* INFOBOX */}

            <div className="row">
              {''}
              {/*Confirmed*/}
              <div
                className="col col--1 "
                onClick={(e) => setCaseType('confirmedCasesIndian')}
              >
                <h1 className="col__header">Confirmed</h1>
                <h1 className="col__count">
                  <CountUp
                    start={0}
                    end={data.length == [] ? globalData.discharged : data[1]}
                  />
                </h1>
                <h1 className="col__location">{new Date().toDateString()}</h1>
              </div>

              {''}
              {/*Recovered*/}
              <div
                className="col col--2 "
                onClick={(e) => setCaseType('recovered')}
              >
                <h1 className="col__header">Recoverd</h1>
                <h1 className="col__count">
                  <CountUp
                    start={0}
                    end={data.length == [] ? globalData.discharged : data[2]}
                  />
                </h1>
                <h1 className="col__location">{new Date().toDateString()}</h1>
              </div>

              {''}
              {/*Deaths*/}
              <div
                className="col col--3 "
                onClick={(e) => setCaseType('deaths')}
              >
                <h1 className="col__header">Deaths</h1>
                <h1 className="col__count">
                  <CountUp
                    start={0}
                    end={data.length == [] ? globalData.discharged : data[3]}
                  />
                </h1>
                <h1 className="col__location">{new Date().toDateString()}</h1>
              </div>
            </div>

            {/*DROPDOWN*/}
            <Dropdown handleData={handleData} stateData={stateData} />

            {/* Graph */}
            <Graph dataG={data} />
          </div>

          <div className="right shadow-lg">
            {/* Map */}
            <Map
              coords={cord}
              zoom={zoom}
              data={mapData}
              stateData={arr}
              caseType={caseType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
