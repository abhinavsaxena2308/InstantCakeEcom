import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'https://node-backend-hj5m.onrender.com',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  