// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'
import { ShowPetList } from './components/ShowPetList'

export function App() {
  const [petResults, setPetResults] = useState([])
  const [newPetName, setNewPetName] = useState('')

  useEffect(async () => {
    const response = await axios.get(
      `https://tamagotchi-justin.herokuapp.com/api/Pets?input=""`
    )
    setPetResults(response.data)
  }, [])

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
      if (response.status === 201) {
        const newPet = response.data
        const newPets = [newPet, ...petResults]
        setPetResults(newPets)
      }
      alert(`Created new pet ${newPetName}!`)
    }
  }

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
          <form onSubmit={handleCreateNewPet}>
            <input
              type="text"
              id="pName"
              placeholder="Enter pet name"
              value={newPetName}
              onChange={e => setNewPetName(e.target.value)}
            />
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
