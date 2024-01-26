'use client'

import { redirect } from 'next/navigation'
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import fetchPet from "../../fetchPet";
import Carousel from "../../Carousel";
import ErrorBoundary from "../../ErrorBoundary";
import Modal from "../../Modal";
import AdoptedPetContext from "../../AdoptedPetContext";
import "../../style.css"
import Link from 'next/link';

const Details = ({ params }) => {
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  console.log(params);
  const id  = params.id;
  console.log(id);
  const results = useQuery(["details", id], fetchPet);
  if (results.isError) {
    return <h2>ohno!</h2>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <p className="loader">🌀</p>
      </div>
    );
  }

  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <Link
                  href="/"
                  onClick={() => {
                    setAdoptedPet(pet);
                  }}
                >
                  Yes
                </Link>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details></Details>
    </ErrorBoundary>
  );
}

export default Details;
