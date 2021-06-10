// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import { ShowPetList } from './components/ShowPetList'

export function App() {
  const history = useHistory()
  let isRedirect = true
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
      history.push('/')
    }
  }

  function PetPage() {
    const [petItem, setPetItem] = useState({
      id: undefined,
      name: '',
      birthday: '',
      hungerLevel: undefined,
      happinessLevel: undefined,
      lastInteractedWithDate: '',
      isDead: false,
    })
    const params = useParams()

    useEffect(function () {
      async function loadOnePet() {
        const response = await axios.get(
          `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}`
        )

        if (response.status === 200) {
          setPetItem(response.data)
        }
      }

      loadOnePet()
    }, [])

    async function deletePet() {
      const response = await axios.delete(
        `https://tamagotchi-justin.herokuapp.com/api/Pets/${params.id}`
      )
      if (response.status === 204) {
        alert('Pet Deleted!')
        history.push('/')
      }
    }

    return (
      <article key={petItem.id}>
        <h3>{petItem.name}</h3>
        <section>
          <p>{petItem.birthday}</p>
          <p>{petItem.hungerLevel}</p>
          <p>{petItem.happinessLevel}</p>
          <button onClick={deletePet}>Delete Pet</button>
        </section>
      </article>
    )
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
            <ShowPetList pet={petResults} />
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
