import axios from 'axios'
import data from './data.json'

export const fetchCord = () => {
  try {
    //     console.log(data);
    return data.map(({ state, latitude, longitude }) => ({
      loc: state,
      lat: latitude,
      lng: longitude,
    }))
  } catch (err) {
    return err
  }
}

//fetching data for india
const url = 'https://api.rootnet.in/covid19-in/stats/latest'

export const fetchData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(url)
    return data
  } catch (error) {
    return error
  }
}
