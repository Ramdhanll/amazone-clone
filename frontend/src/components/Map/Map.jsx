import React, { useEffect, useRef, useState } from "react"
import {
   LoadScript,
   GoogleMap,
   StandaloneSearchBox,
   Marker,
} from "@react-google-maps/api"
import axios from "axios"
import { useDispatch } from "react-redux"
import { USER_ADDRESS_MAP_CONFIRM } from "../../redux/user/UserTypes"
import LoadingBox from "../utils/LoadingBox"

const libs = ["places"]
const defaultLocation = { lat: 45.516, lng: -73.56 }

const Map = (props) => {
   const dispatch = useDispatch()
   const [googleApiKey, setGoogleApiKey] = useState("")
   const [center, setCenter] = useState(defaultLocation)
   const [location, setLocation] = useState(center)

   const mapRef = useRef(null)
   const placeRef = useRef(null)
   const markerRef = useRef(null)
   useEffect(() => {
      const fetch = async () => {
         const { data } = await axios.get("/api/config/google")
         setGoogleApiKey(data)
         getUserCurrentLocation()
      }
      fetch()
   }, [])

   const onLoad = (map) => {
      mapRef.current = map
   }

   const onMarkerLoad = (marker) => {
      markerRef.current = marker
   }

   const onPlacesLoad = (place) => {
      placeRef.current = place
   }

   const onIdle = () => {
      setLocation({
         lat: mapRef.current.center.lat(),
         lng: mapRef.current.center.lng(),
      })
   }

   const onPlacesChanged = () => {
      const place = placeRef.current.getPlaces()[0].geometry.location
      setCenter({ lat: place.lat(), lng: place.lng() })
      setLocation({ lat: place.lat(), lng: place.lng() })
   }

   const onConfirm = () => {
      const places = placeRef.current.getPlaces()
      if (places && places.length === 1) {
         dispatch({
            type: USER_ADDRESS_MAP_CONFIRM,
            payload: {
               lat: location.lat,
               lng: location.lng,
               address: places[0].formatted_address,
               name: places[0].name,
               vicinity: places[0].vicinity,
               googleAddressId: places[0].id,
            },
         })
         alert("location selected successfulyy")
         props.history.push("/shipping")
      } else {
         alert("Please enter your address")
      }
   }

   const getUserCurrentLocation = () => {
      if (!navigator.geolocation) {
         alert("Geolocation os no supported by this browser")
      } else {
         navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
               lat: position.coords.latitude,
               lng: position.coords.longitude,
            })
            setLocation({
               lat: position.coords.latitude,
               lng: position.coords.longitude,
            })
         })
      }
   }

   return googleApiKey ? (
      <div className="fullContainer">
         <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
            <GoogleMap
               id="sample-map"
               mapContainerStyle={{ height: "100%", width: "100%" }}
               center={center}
               zoom={15}
               onLoad={onLoad}
               onIdle={onIdle}
            >
               <StandaloneSearchBox
                  onLoad={onPlacesLoad}
                  onPlacesChanged={onPlacesChanged}
               >
                  <div className="map-input-box">
                     <input type="text" placeholder="Enter your address" />
                     <button
                        className="primary"
                        type="button"
                        onClick={onConfirm}
                     >
                        Confirm
                     </button>
                  </div>
               </StandaloneSearchBox>
               <Marker position={location} onLoad={onMarkerLoad} />
            </GoogleMap>
         </LoadScript>
      </div>
   ) : (
      <LoadingBox />
   )
}

export default Map
