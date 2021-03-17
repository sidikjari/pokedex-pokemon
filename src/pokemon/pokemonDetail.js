import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { GetPokemon } from './pokemon.service';
import typesColor from './typesColor';
import Progress from './../common/progressbar';

const isEmpty = obj => Object.values(obj).every(x => x === null);

const Detail = ({color, onColor}) => {
    const params = useParams();
    const { pokemon, isLoading } = GetPokemon(params.id);
    useEffect(() => {
        if(pokemon.types !== null){
            onColor(typesColor[pokemon.types[0]]);
        }
    }, [pokemon, onColor]);
    
    if(isLoading || isEmpty(pokemon)) return <div className="mt-16 text-center font-medium text-md">Loading...</div>
    const status_values = pokemon.stats.map(({value}) => value);
    const { evolution_chain } = pokemon;
    console.log(pokemon)
    console.log('======= evolution_chain =======')
    console.log(pokemon.evolution_chain[0])
    console.log('===============================')
    
    return(
        <>
        <HelmetProvider>
            <Helmet>
                <meta name="theme-color" content={color} />
            </Helmet>
        </HelmetProvider>
        <div className="grid grid-cols-1 overflow-y-scroll">
            <span className="text-center text-lg px-2 py-2 font-semibold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
            <img className="w-44 md:w-60 m-auto" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
            <div className="text-center">
                <div className="grid grid-cols-3 leading-10">
                    <span className="text-right pr-2 font-semibold">ID</span>
                    <span className="pl-2 col-span-2 text-left">#{pokemon.id}</span>
                </div>
                <div className="grid grid-cols-3 leading-10">
                    <span className="text-right pr-2 font-semibold">Generation</span>
                    <span className="pl-2 col-span-2 text-left">{pokemon.generation}</span>
                </div>
                <div className="grid grid-cols-3 leading-10">
                    <span className="text-right pr-2 font-semibold">Weight</span>
                    <span className="pl-2 col-span-2 text-left">{`${pokemon.weight.kilograms}kg`} {`(${pokemon.weight.pounds}lbs)`}</span>
                </div>
                <div className="grid grid-cols-3 leading-10">
                    <span className="text-right pr-2 font-semibold">Height</span>
                    <span className="pl-2 col-span-2 text-left">{`${pokemon.height.meters}m`} {`(${pokemon.height.feet}ft)`}</span>
                </div>
                <div className="grid grid-cols-3 leading-10">
                    <span className="text-right pr-2 font-semibold">Abilities</span>
                    <div className="flex flex-wrap col-span-2 leading-10">
                    {pokemon.abilities.map(ability => (
                    <div key={ability}>
                        <span className="mr-1 py-1 px-2 rounded-full rounded-md text-white" style={{backgroundColor: color}}>{ability.charAt(0).toUpperCase() + ability.slice(1)}</span>
                    </div>
                    ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 leading-10">
                    <span className="text-right pr-2 font-semibold">Types</span>
                    <div className="flex col-span-2 leading-10">
                    {pokemon.types.map((type, index) => (
                        <img src={`./../asset/type_icons/${type}.svg`}
                           style={{
                                backgroundColor: typesColor[type],
                                boxShadow: `0 0 10px ${typesColor[type]}`
                           }}
                           className="w-8 h-8 p-1 rounded-full m-1"
                           alt={type}
                           key={index} />
                    ))}
                    </div>
                </div>
                <div className="px-2">
                    <div className="md:w-4/5 md:m-auto my-10">
                    {pokemon.stats.map((status, index) => (
                        <Progress key={index} color={color} status={status} status_values={status_values} />
                    ))}
                    </div>
                </div>
            </div>
            <div className="z-20">
                <pre>{pokemon.evolution_chain.length > -1 ? JSON.stringify(pokemon.evolution_chain) : 'NuLLL'}</pre>
            </div>
        </div>
        </>
    );
    
}

export default Detail;