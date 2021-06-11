// @ts-nocheck
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
          <Link to="/">See All Pets</Link> &emsp;
          <Link to="/create">Create New Pet</Link>
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
          <div className="main">
            <PetPage />
          </div>
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
