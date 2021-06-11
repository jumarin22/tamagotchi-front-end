import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'

export function CreatePet() {
  const [newPetName, setNewPetName] = useState('')
  const history = useHistory()

  async function handleCreateNewPet(e) {
    e.preventDefault()
    if (newPetName == '') {
      alert('You must enter a pet name!')
    } else {
      const response = await axios.post(
        `https://tamagotchi-justin.herokuapp.com/api/Pets/`,
        {
          name: newPetName,
        }
      )
      alert(`Created new pet ${newPetName}!`)
      history.push('/')
      setNewPetName('')
    }
  }

  return (
    <>
      <h4>What is your new pet's name?</h4>
      <form onSubmit={handleCreateNewPet}>
        <input
          type="text"
          id="pName"
          placeholder="Enter pet name"
          value={newPetName}
          onChange={e => setNewPetName(e.target.value)}
        />
      </form>
    </>
  )
}
