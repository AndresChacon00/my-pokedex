import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Detail.css'
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
        <div className="detail-container">
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="pokemon-info">
                <p><strong>Height: </strong>{pokemon.height}</p>
                <p><strong>Weight: </strong>{pokemon.height}</p>
                <p><strong>Base Experience: </strong>{pokemon.base_experience}</p>
                <p><strong>Types: </strong>{pokemon.types.map(typeInfo => typeInfo.type.name).join(', s')}</p>
            </div>
        </div>
        </div>
    )

}

export default Detail;