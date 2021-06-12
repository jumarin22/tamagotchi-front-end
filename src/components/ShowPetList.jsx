// @ts-nocheck
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

export function ShowPetList() {
  const [petResults, setPetResults] = useState([])
  const history = useHistory()

  useEffect(async () => {
    const response = await axios.get(
      `https://tamagotchi-justin.herokuapp.com/api/Pets?input=""`
    )
    setPetResults(response.data)
  }, [])

  function parseDate(birthday) {
    return birthday.substr(5, 5)
  }

  return petResults.map(function (pet) {
    return (
      <div class="egg" key={pet.id} onClick={() => history.push(`/${pet.id}`)}>
        <article>
          <h2>{pet.name}</h2>
          <div className="list-display">
            <p className="bit">
              <span class="outline">🎂</span>&emsp;{parseDate(pet.birthday)}
            </p>
            <p className="bit">
              <span class="outline">🍖</span>&emsp;{pet.hungerLevel}
            </p>
            <p className="bit">
              <span class="outline">🙂</span>&emsp;{pet.happinessLevel}
            </p>
          </div>
          <p className="link">
            <Link to={`/${pet.id}`}>&#8729;&#8729;&#8729;</Link>
          </p>
        </article>
      </div>
    )
  })
}
