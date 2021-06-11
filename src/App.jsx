// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import { CreatePet } from './components/CreatePet'
import { ShowPetList } from './components/ShowPetList'
import { PetPage } from './components/PetPage'

export function App() {
  const history = useHistory()

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
          <CreatePet />
        </Route>
        <Route path="/:id">
          <PetPage />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
