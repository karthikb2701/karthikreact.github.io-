import React from 'react'
import '../sass/component/Dropdown.scss'

const Dropdown = ({ handleData, stateData }) => {
  return (
    <div>
      <div className="dropdown">
        <select className="select" onClick={handleData}>
          <option className="options" value="India">
            India
          </option>
          {stateData.map(
            ({ loc, deaths, discharged, confirmedCasesIndian }, key) => (
              <option
                className="options"
                value={[loc, confirmedCasesIndian, discharged, deaths]}
                key={key}
              >
                {loc}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  )
}

export default Dropdown
