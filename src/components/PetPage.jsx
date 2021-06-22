// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function PetPage() {
  const history = useHistory()
  const [petItem, setPetItem] = useState({
    id: '',
    name: 'Loading Pet...',
    birthday: '0000-00-00',
    hungerLevel: '-99',
    happinessLevel: '-99',
  })
  const params = useParams()

  async function loadPetInfo() {
    const response = await fetch(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}`
    )

    if (response.ok) {
      const json = await response.json()
      setPetItem(json)
    }
  }

  useEffect(() => {
    loadPetInfo()
  }, [params.id])

  async function feedPet() {
    const response = await axios.post(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${petItem.id}/feedings`,
      {}
    )
    if (response.status === 200) {
      loadPetInfo()
    }
  }

  async function playPet() {
    const response = await axios.post(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${petItem.id}/playtimes`,
      {}
    )
    if (response.status === 200) {
      loadPetInfo()
    }
  }

  async function scoldPet() {
    const response = await axios.post(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${petItem.id}/scoldings`,
      {}
    )
    if (response.status === 200) {
      loadPetInfo()
    }
  }

  async function deletePet() {
    const response = await axios.delete(
      `https://tamagotchi-justin.herokuapp.com/api/Pets/${petItem.id}`
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
            <span className="grey">Birthday:</span>{' '}
            {parseDate(petItem.birthday)}
          </p>
          <p>
            {' '}
            <span className="grey">Hunger Level:</span> {petItem.hungerLevel}
          </p>
          <p>
            {' '}
            <span className="grey">Happiness Level: </span>{' '}
            {petItem.happinessLevel}
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
