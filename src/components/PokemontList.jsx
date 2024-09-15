import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPokemons } from '../api/api';
import PokemonCard from './PokemonCard';

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [next, setNext] = useState("")
    const observer = useRef();
    useEffect(() => {
        async function getPokemons() {
            const {next, results} = await fetchPokemons();
            setPokemons(results);
            setNext(next);
        }
        getPokemons();
    }, []);

    const lastPokemonElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver( entries => {
            if (entries[0].isIntersecting && next) {
                async function loadMorePokemons() {
                    const {next: newNext, results} = await fetchPokemons(next);
                    setPokemons(prevPokemons => [...prevPokemons, ...results]);
                    setNext(newNext);
                }
                loadMorePokemons();
            }
        });
        if (node) observer.current.observe(node);
    }, [next]);

    return (
        <div className="pokemon-list">
            {pokemons && pokemons.map((pokemon, index) => {
                if(pokemons.length === index + 1) {
                    return <div ref={lastPokemonElementRef} key={index}>
                        <PokemonCard url={pokemon.url} />
                    </div>
                } else {
                    return <PokemonCard key={index} url={pokemon.url} />
                }
            })}
        </div>
    )
}

export default PokemonList;