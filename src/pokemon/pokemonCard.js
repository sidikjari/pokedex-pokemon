//import { Link } from 'react-router-dom';
import typesColor from './typesColor';

const PokemonCard = ({name, types, sprites, id, setColor}) => {
    return(
        <div className="border shadow-md rounded-md overflow-hidden pb-1 m-1 pointer ">
          <span className="w-32 px-2 py-4 italic text-sm">#{id}</span>
          <img className="w-20 m-auto" src={sprites} alt={name} />
          <div className="text-center">
              <span className="text-sm">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              <div className="flex justify-center">
              {types.map((type, index) => (
                <img src={`./asset/type_icons/${type}.svg`}
                   style={{
                        backgroundColor: typesColor[type],
                        boxShadow: `0 0 8px ${typesColor[type]}`
                   }}
                   className="w-5 h-5 p-1 rounded-full m-1"
                   alt={type}
                   key={index} />
              ))}
              </div>
          </div>
        </div>
    );
}



export default PokemonCard;