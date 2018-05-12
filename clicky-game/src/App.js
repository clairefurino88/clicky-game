import React, { Component } from 'react';
import './App.css';
import cat from './cats.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import CatCard from './components/CatCard'

class App extends Component {
    state = {
        message: "",
        topScore: 0,
        curScore: 0,
        cat: cat,
        unselectedCats: cat
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectDog = breed => {
        const findDog = this.state.unselectedCats.find(item => item.breed === breed);

        if(findDog === undefined) {
            // failure to select a new dog
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                cat: cat,
                unselectedCats: cat
            });
        }
        else {
            // success to select a new dog
            const newDogs = this.state.unselectedCats.filter(item => item.breed !== breed);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                cat: cat,
                unselectedCats: newDogs
            });
        }

        this.shuffleArray(cat);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.cat.map(dog => (
                        <CatCard
                            breed={dog.breed}
                            image={dog.image}
                            selectDog={this.selectDog} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

