import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './styles.css'
/**
 * @param {{ url: string }} props
 */
function PokemonCard({url}) {
    const[pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const data = await response.json()
                console.log("Fetched img", data.sprites.front_default); 
                setPokemon(data)
            } catch (error) {
                console.error("There was a proble with the fetch operation: ", error)
            }
        }

        fetchPokemon();
    }, [url]);

    if (!pokemon) {
        return <p>Loading...</p>
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Link to={`/detail/${pokemon.name}`}>
            <div className="pokemon-card">
                <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
        </Link>
    )
}
PokemonCard.propTypes = {
    url: PropTypes.string.isRequired,
};


export default PokemonCard;
