// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import { ShowPetList } from './components/ShowPetList'
import { PetPage } from './components/PetPage'

export function App() {
  const history = useHistory()
  const [newPetName, setNewPetName] = useState('')

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
      // if (response.status === 201) {
      //   const newPet = response.data
      //   const newPets = [newPet, ...petResults]
      //   setPetResults(newPets)
      // }
      alert(`Created new pet ${newPetName}!`)
      history.push('/')
      setNewPetName('')
    }
  }

  return (
    <>
      <header>
        <h1>Petagotchi</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">See All Pets</Link>
            </li>
            <li>
              <Link to="/create">Create New Pet</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          <div className="main">
            <ShowPetList />
          </div>
        </Route>
        <Route exact path="/create">
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
        <Route path="/:id">
          <PetPage />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
