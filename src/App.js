import { Navigation } from '@mui/icons-material';
import React, { useState } from 'react'

const App = () => {
  const [lattitude, setLattitude] = useState();
  const [longitude, setLangitude] = useState();
  const [userAddress, setUserAddress] = useState()

  const [gpslattitude, seGpstLattitude] = useState();
  const [gpslongitude, seGpstLangitude] = useState();

  const geo = navigator.geolocation;

  geo.getCurrentPosition(userCoords)
  function userCoords(position) {
    let userLatitude = position.coords.latitude
    let userLongitude = position.coords.longitude
    setLattitude(userLatitude)
    setLangitude(userLongitude)
  }

  const WatchId = geo.watchPosition(userGpsCoods)
  function userGpsCoods(position) {
    let usergpsLatitude = position.coords.latitude
    let userGpsLongitude = position.coords.longitude
    seGpstLattitude(usergpsLatitude)
    seGpstLangitude(userGpsLongitude)
  }

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=da99e1ee07284f95a25d696765183290&q=${lattitude}%2C+${longitude}&pretty=1&no_annotations=1`
    const loc = await fetch(url)
    const data = await loc.json()
    console.log("user Address: ", data)
    setUserAddress(data.results[0].formatted)
  }

  const handlegetUserAdress = () => {
    getUserAddress()
  }

  const StopWatch = () => {
    geo.clearWatch(WatchId);
  }
  StopWatch()

  return (
    <>
      <h1>Current Location</h1>
      <h3>lattitude :- {lattitude}</h3>
      <h3>Longitude :- {longitude}</h3>
      <h3>user Address :- {userAddress}</h3>
      <button onClick={handlegetUserAdress}>get User Address</button>
      <hr />
      <h1>GPS Tracking</h1>
      <h3>GPS Latitude:- {gpslattitude}</h3>
      <h3>GPS longitude:- {gpslongitude}</h3>

    </>
  )
}

export default App
