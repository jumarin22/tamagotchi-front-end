// @ts-nocheck
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function ShowPetList() {
  const [petResults, setPetResults] = useState([])

  useEffect(async () => {
    const response = await axios.get(
      `https://tamagotchi-justin.herokuapp.com/api/Pets?input=""`
    )
    setPetResults(response.data)
  }, [])

  function parseDate(birthday) {
    return birthday.substr(0, 10)
  }

  return petResults.map(function (pet) {
    return (
      <article key={pet.id}>
        <h2>{pet.name}</h2>
        <div className="list-display">
          <p>Birthday: {parseDate(pet.birthday)}</p>
          <p>Hunger Level: {pet.hungerLevel}</p>
          <p>Happiness Level: {pet.happinessLevel}</p>
        </div>
        <p className="link">
          <Link to={`/${pet.id}`}>Select Pet</Link>
        </p>
      </article>
    )
  })
}
