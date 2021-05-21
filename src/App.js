import React, {Component} from 'react';

import { CardList } from './component/card-list/card-list.component';

import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            page: 50,
            pokemons : []
        };
    }

    componentDidMount(){


        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(response => response.json())
        .then(name => this.setState({pokemons:name.results}));
    }
    
    handleClick = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${this.state.page}`)
            .then((response) => response.json())
            .then((name) => {
                const newPokemons = [...this.state.pokemons, ...name.results ]
                this.setState({ ...this.state, page: this.state.page+50, pokemons: newPokemons });
            });
    }

    render(){
        const { pokemons } = this.state;

        return(
            <div className="App">
                <CardList pokemons={pokemons}></CardList>
                <button onClick={this.handleClick}> Nuevo pokemon </button>
            </div>
            
        );
    }
}

export default App;
