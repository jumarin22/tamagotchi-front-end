// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function PetPage() {
  const history = useHistory()
  const [petItem, setPetItem] = useState({
    id: undefined,
    name: 'Loading Pet...',
    birthday: '0000-00-00',
    hungerLevel: -99,
    happinessLevel: -99,
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
    <article key={petItem.id} className="zoom">
      <h2>{petItem.name}</h2>
      <div className="display">
        <div className="pet-info">
          <p>
            <span class="grey">Birthday:</span> {parseDate(petItem.birthday)}
          </p>
          <p>
            {' '}
            <span class="grey">Hunger Level:</span> {petItem.hungerLevel}
          </p>
          <p>
            {' '}
            <span class="grey">Happiness Level: </span> {petItem.happinessLevel}
          </p>
        </div>
        <div className="menu">
          <button onClick={feedPet}>Feed</button>
          <button onClick={playPet}>Play</button>
          <button onClick={scoldPet}>Scold</button>
          <button onClick={deletePet}>Delete</button>
        </div>
      </div>
      <p className="bottom">
        <Link to={`/`}>&#8592; back to list</Link>
      </p>
    </article>
  )
}
