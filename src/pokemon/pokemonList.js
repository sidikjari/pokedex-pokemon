import { useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GetAllPokemon } from './pokemon.service';
import PokemonCard from './pokemonCard';


const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
//const url = 'https://pokeapi.co/api/v2/pokemon';

const PokemonList = ({onColor}) => {
    //const [url, setUrl] = useState(baseUrl);
    const response = GetAllPokemon(baseUrl);
    const history = useHistory();
    useEffect(() => {
        if(history.action === 'POP'){
            onColor(null);
        }
    }, [history, onColor]);
    if(response.isError) return <p>Error</p>
    if(response.isLoading) return <div className="mt-16 text-center font-medium text-md">Loading...</div>
    
    return(
        <div className="grid grid-cols-3 md:grid-cols-6 bg-gray-100 overflow-y-scroll">
            {response.pokemons.map(pokemon => (
                <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                <PokemonCard 
                    id={pokemon.id}
                    name={pokemon.name} 
                    types={pokemon.types} 
                    sprites={pokemon.sprites.other['official-artwork'].front_default} />
                </Link>
            ))}
        </div>
    );
}



export default PokemonList;