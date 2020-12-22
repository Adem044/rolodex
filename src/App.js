import React, { Component } from "react";
import NavBar from "./components/navBar/navBar";
import { CardList } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
      showFull: false,
      clickedImg: 0,
      favourites: [],
      showFavs: false,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) =>
        this.setState({
          monsters: user,
        })
      );
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  cardClickHandler = (ev, id) => {
    if (!ev.target.className.includes("fa-bookmark")) {
      this.setState({ showFull: true, clickedImg: id });
    } else {
      if (!this.state.favourites.includes(id)) {
        this.setState((prevState) => prevState.favourites.push(id));
      } else {
        this.setState(
          (prevState) =>
            prevState.favourites.splice(
              prevState.favourites.findIndex((fav) => fav === id),
              1
            ),
          () =>
            this.state.favourites.length
              ? null
              : this.setState({ showFavs: false })
        );
      }
    }
  };

  closeFull = () => {
    this.setState({ showFull: false });
  };

  navItemHandler = (id) => {
    if (id) {
      this.setState({ showFavs: true });
    } else {
      this.setState({ showFavs: false });
    }
  };

  render() {
    const { monsters, searchField, favourites } = this.state;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    const myFav = monsters.filter((monster) => favourites.includes(monster.id));
    return (
      <div className="App">
        {this.state.showFull && (
          <div className="show-full" onClick={this.closeFull}>
            <img
              alt="monster"
              src={`https://robohash.org/${this.state.clickedImg}?set=set2&size=180x180`}
            />
          </div>
        )}
        <NavBar
          navItems={
            this.state.favourites.length
              ? ["Monsters", "Favourites"]
              : ["Monsters"]
          }
          clicked={(id) => this.navItemHandler(id)}
          active={this.state.showFavs}
        />
        <h1>Monster Rolodex </h1>
        <SearchBox
          placeholder="Search Monster"
          handleChange={this.handleChange}
        />
        {filteredMonsters.length > 0 ? (
          <CardList
            clicked={(ev, id) => this.cardClickHandler(ev, id)}
            monsters={
              this.state.showFavs
                ? myFav
                : this.state.searchField.length
                ? filteredMonsters
                : monsters
            }
            myFav={favourites}
          />
        ) : (
          <p className="error">Username Doesn't Exist</p>
        )}
      </div>
    );
  }
}

export default App;
