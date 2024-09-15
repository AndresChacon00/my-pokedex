import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Detail() {
    const {name} = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const data = await response.json();
                setPokemon(data);

            } catch (error) {
                console.log("Error: ", error)
            }
        }
        fetchPokemon();
    }, [name]);

    if (!pokemon) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h2>DETALLEEEEEE{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
    )

}

export default Detail;