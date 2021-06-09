import React from 'react'

export function ShowPetList(props) {
  return props.pet.map(function (pet) {
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
  })
}
