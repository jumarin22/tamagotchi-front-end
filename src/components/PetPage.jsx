// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'

export function PetPage() {
  const history = useHistory()
  const [petItem, setPetItem] = useState({
    id: undefined,
    name: 'Loading Pet...',
    birthday: '',
    hungerLevel: undefined,
    happinessLevel: undefined,
    lastInteractedWithDate: '',
    isDead: false,
  })
  const params = useParams()
  const headers = {
    'Content-Type': 'application/json',
  }

  useEffect(() => {
    async function loadOnePet() {
      const response = await axios.get(
        `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}`
      )

      if (response.status === 200) {
        setPetItem(response.data)
      }
    }

    loadOnePet()
  }, [petItem])

  async function feedPet() {
    const response = await axios.post(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}/feedings`,
      headers
    )
    if (response.status === 200) {
    }
  }

  async function playPet() {
    const response = await axios.post(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}/playtimes`,
      headers
    )
    if (response.status === 200) {
    }
  }

  async function scoldPet() {
    const response = await axios.post(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}/scoldings`,
      headers
    )
    if (response.status === 200) {
    }
  }

  async function deletePet() {
    const response = await axios.delete(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}`
    )
    if (response.status === 200) {
      history.push('/')
    }
  }

  function parseDate(birthday) {
    return birthday.substr(0, 10)
  }

  return (
    <article key={petItem.id}>
      <h2>{petItem.name}</h2>
      <div className="display">
        <div className="pet-info">
          <p>Birthday: {parseDate(petItem.birthday)}</p>
          <p>Hunger Level: {petItem.hungerLevel}</p>
          <p>Happiness Level: {petItem.happinessLevel}</p>
        </div>
        <div className="menu">
          <button onClick={feedPet}>Feed Pet</button>
          <button onClick={playPet}>Play with Pet</button>
          <button onClick={scoldPet}>Scold Pet</button>
          <button onClick={deletePet}>Delete Pet</button>
        </div>
      </div>
    </article>
  )
}
