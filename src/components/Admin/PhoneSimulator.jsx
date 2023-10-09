import React, { useEffect, useState } from 'react'
import { getUserUrl } from '../../hooks/GetUserUrl'
import { context } from "../../context/Context"
import CardToPhone from '../../elements/CardToPhone'

export default function PhoneSimulator() {
  const { user } = context()
  const [cekUser, setCekUser] = useState()
  const [dataLink, setDataLink] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUserUrl()
        const findUserLink = response.documents.find(data => data.$id == user.$id)
        setCekUser(findUserLink)
        setDataLink(findUserLink.links)
      } catch (error) {
        throw error
      }
    }

    fetchData()
  }, [])

  function getFirstCharacter(name) {
    return name[0].toUpperCase()
  }
  
  return (
    <div className='flex flex-col w-72 bg-gray-500 border border-8 border-black p-4' style={{borderRadius: "30px", height: "480px"}}>
      <div className='flex justify-end'>
        <div className='flex items-center justify-center w-10 h-10 bg-white pb-3 rounded rounded-full'>
          <p>...</p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <div className='flex items-center justify-center w-20 h-20 bg-white rounded rounded-full'>
          <p className='font-bold text-2xl'>{getFirstCharacter(cekUser?.username)}</p>
        </div>
        <div>
          <p className='font-bold text-xl mt-4 text-white'>@{cekUser?.username}</p>
        </div>
        { dataLink ? (
          dataLink.map((data, index) => (
            <div className='w-full my-1' key={index}>
              <CardToPhone name={data.name} url={data.url} />
            </div>
          ))
        ) : ""}
      </div>
      <div className='mt-32'>
        <p className='font-semibold text-lg mt-4 text-white text-center'>Linktree</p>
      </div>
    </div>
  )
}
