// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'
import { ShowPetList } from './components/ShowPetList'

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
              <Link to="/">See All Pets</Link>
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
          <div className="main">
            <ShowPetList pet={petResults} />
          </div>
        </Route>
        <Route exact path="/1">
          <h4>What is your new pet's name?</h4>
          <form>
            <input type="text" id="pName" />
          </form>
        </Route>
        <Route exact path="/2">
          Page 2
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
