import { useState, useEffect } from 'react';
import axios from 'axios';

const urls = {
    pokemon: 'https://pokeapi.co/api/v2/pokemon',
    species: 'https://pokeapi.co/api/v2/pokemon-species'
}

const filterPropertyEvolution = async (data) => {
    try{
        const evoChain = [];
        let evoData = data.chain;
        
        do {
        const numberEvoLength = evoData.evolves_to.length;
        const evoDetails = evoData.evolution_details[0];
        
        const _pokemon = await axios.get(`${urls.pokemon}/${evoData.species.name}`);
        const _p = await filterPropertyPokemon([_pokemon.data], ['sprites', 'types'])[0];
        evoChain.push({
            'name': evoData.species.name,
            'min_level': !evoDetails ? 1 : evoDetails.min_level,
            'trigger_name': !evoDetails ? null : evoDetails.trigger.name,
            'item': !evoDetails ? null : evoDetails.item,
            'time_of_day': !evoDetails ? null : evoDetails.time_of_day,
            'min_happiness': !evoDetails ? null : evoDetails.min_happiness,
            'location': !evoDetails ? null : evoDetails.location,
            'types': _p.types,
            'sprites': _p.sprites
        });
        if(numberEvoLength > 1) {
            for (let i = 0; i < numberEvoLength; i++) {
              const _pokemon = await axios.get(`${urls.pokemon}/${evoData.evolves_to[i].species.name}`);
              const _p = await filterPropertyPokemon([_pokemon.data], ['sprites', 'types'])[0];
              let _item = [];
              let _location = [];
              const evoDetailsLen = evoData.evolves_to[i].evolution_details;
              if(evoDetailsLen.length > 1){
                  for(let { item, location } of evoDetailsLen){
                      if(item){
                          const v = null || item.name;
                          _item.push(v);
                      }
                      if(location){
                          const v = null || location.name;
                          _location.push(v);
                      }
                  }
              }
              evoChain.push({
                "name": evoData.evolves_to[i].species.name,
                "min_level": !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].evolution_details[0].min_level,
                "trigger_name": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
                "item": !evoData.evolves_to[i] ? null : _item,
                'time_of_day': !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].time_of_day,
                'min_happiness': !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].min_happiness,
                'location': !evoData.evolves_to[i] ? null : _location,
                'types': _p.types,
                'sprites': _p.sprites
             });
            }
         }
        evoData = evoData.evolves_to;
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        
        return evoChain;
    }catch(error){
        throw error;
    }
}

const filterPropertyPokemon = (value = [], keys = []) => {
    const c = value.map(obj => {
        return keys.reduce((acc, key) => {
            if(key === 'types'){
                const { types } = obj;
                const _types = types.map(({type}) => type.name);
                acc[key] = _types;
                return acc;
            }
            if(key === 'abilities'){
                const { abilities } = obj;
                const _abilities = abilities.map(({ability}) => ability.name);
                acc[key] = _abilities;
                return acc;
            }
            if(key === 'stats'){
                const { stats } = obj;
                const status = stats.map(({base_stat, stat}) => {
                    return {
                        'name': stat.name,
                        'value': base_stat
                    }
                });
                acc[key] = status;
                return acc;
            }
            if(key === 'height'){
                const { height } = obj;
                const _height = {
                    default_value : height,
                    meters: (height/10).toFixed(1),
                    feet: (height/3.048).toFixed(1)
                }
                acc[key] = _height;
                return acc;
            }
            if(key === 'weight'){
                const { weight } = obj;
                const _weight = {
                    default_value : weight,
                    kilograms: (weight/10).toFixed(1),
                    pounds: (weight/4.536).toFixed(1)
                }
                acc[key] = _weight;
                return acc;
            }
            if(key === 'evolution_chain'){
                const { evolution_chain } = obj;
                let evoData = []
                axios.get(evolution_chain.url)
                    .then(res => filterPropertyEvolution(res.data))
                    .then(res => {
                        res.forEach(d => evoData.push(d));
                    })
                acc[key] = evoData;
                return acc;
            }
            if(key === 'generation'){
                const { generation } = obj;
                acc[key] = generation.name;
                return acc;
            }
            if(key === 'egg_groups'){
                const { egg_groups } = obj;
                const _egg_groups = egg_groups.map(typeMons => typeMons.name);
                acc[key] = _egg_groups;
                return acc;
            }
            
            acc[key] = obj[key];
            return acc;
        }, {});
    });
    return c;
}

const initialState = {
    id: null,
    name: null,
    types: null,
    sprites: null,
    height: null,
    weight: null,
    abilities: null,
    egg_groups: null,
    stats: null,
    evolution_chain: null
}


const pokemonKeys = [ 'id', 'name', 'weight', 'height', 'types', 'abilities', 'sprites', 'stats', 'egg_groups', 'generation', 'evolution_chain' ];

export const GetPokemon = (id) => {
    const [pokemon, setPokemon] = useState(initialState);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getPokemon = async () => {
            setIsLoading(true);
            try{
                const pokemonData = await axios.get(`${urls.pokemon}/${id}`);
                const pokemonSpecies = await axios.get(`${urls.species}/${id}`);
                const _pokemonData = filterPropertyPokemon([{...pokemonData.data, ...pokemonSpecies.data}], pokemonKeys)[0];
                //console.log(_pokemonData)
                setPokemon(_pokemonData);
            }catch(error){
                setIsError(true);
            }
            setIsLoading(false);
        }
        getPokemon();
    }, [id]);
    
    return {
        pokemon,
        isLoading,
        isError
    }
}

export const GetAllPokemon = (url) => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const getPokemons = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(url);
                const urls = await response.data.results.map(({url}) => axios.get(url));
                const fetchPokemons  = await Promise.allSettled(urls);
                const data = fetchPokemons.filter(({status}) => status === 'fulfilled').map(({value}) => value.data);
                const _pokemons = filterPropertyPokemon(data, ['id', 'name', 'sprites', 'types']);
                //console.log(_pokemons)
                setPokemons(prev => [...prev, ..._pokemons]);
            }catch(error){
                console.log(error)
                setIsError(true);
            }
            setIsLoading(false);
        }
        getPokemons();
    }, [url]);
    return { 
        pokemons, 
        isError, 
        isLoading 
    }
}
