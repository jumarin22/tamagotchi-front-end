// @ts-nocheck

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom'

export function ShowPetList() {
  const [petResults, setPetResults] = useState([])

  useEffect(async () => {
    const response = await axios.get(
      `https://tamagotchi-justin.herokuapp.com/api/Pets?input=""`
    )
    setPetResults(response.data)
  }, [])

  return petResults.map(function (pet) {
    return (
      <article key={pet.id}>
        <h3>{pet.name}</h3>
        <section>
          <p>{pet.birthday}</p>
          <p>{pet.hungerLevel}</p>
          <p>{pet.happinessLevel}</p>
          <p>
            <Link to={`/${pet.id}`}>Select Pet</Link>
          </p>
        </section>
      </article>
    )
  })
}
