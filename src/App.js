import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './common/navbar';
import PokemonList from './pokemon/pokemonList';
import PokemonDetail from './pokemon/pokemonDetail';

function App() {
  const [color, setColor] = useState(null);
  const onColor = color => {
      setColor(color);
  }
  return (
    <div className="flex flex-col h-screen">
    <Router>
        <Navbar color={color} />
        <Switch>
            <Route exact path="/" >
                <PokemonList onColor={onColor} />
            </Route>
            <Route exact path="/pokemon/:id" >
                <PokemonDetail color={color} onColor={onColor} />
            </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
