// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'

export function App() {
  const [petResults, setPetResults] = useState([])

  useEffect(async () => {
    const response = await axios.get(
      `https://tamagotchi-justin.herokuapp.com/api/Pets?input=""`
    )
    setPetResults(response.data)
  }, [])

  return (
    <>
      <header>
        <h1>Tamagotchi</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to="/1">Create New Pet</Link>
            </li>
            <li>
              <Link to="/2">Page 2</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          <div>
            {petResults.map(function (pet) {
              return (
                <article key={pet.id}>
                  <h3>{pet.name}</h3>
                  <section>
                    <p>{pet.birthday}</p>
                    <p>{pet.hungerLevel}</p>
                    <p>{pet.happinessLevel}</p>
                  </section>
                </article>
              )
            })}
          </div>
        </Route>
        <Route exact path="/1">
          What is your new pet's name?
        </Route>
        <Route exact path="/2">
          Page 2
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
