import React, { Component } from "react";
import NavBar from "./components/navBar/navBar";
import { CardList } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box";
import DropDownMenu from "./components/dropDownMenu/dropDownMenu";
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
      sortBy: "default",
      notifications: [],
      recent: [],
      showDrop: false,
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
      this.setState((prevState) => prevState.recent.push(id));
      if (!this.state.favourites.includes(id)) {
        this.setState((prevState) => prevState.favourites.push(id));
        this.setState((prevState) =>
          prevState.notifications.push({ id, type: "added" })
        );
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
        this.setState((prevState) =>
          prevState.notifications.push({ id, type: "removed" })
        );
      }
    }
  };

  closeFull = () => {
    this.setState({ showFull: false });
  };

  navItemHandler = (id) => {
    this.setState({ showFavs: id ? true : false });
  };

  handleSelected = (selected) => {
    this.setState({ sortBy: selected });
  };
  handleNotif = () => {
    this.setState({ recent: [] });
    this.setState((prev) => {
      return {
        ...prev,
        showDrop: !prev.showDrop,
      };
    });
  };

  render() {
    let monsters = [...this.state.monsters];
    const {
      showFavs,
      searchField,
      favourites,
      sortBy,
      notifications,
      recent,
      showDrop,
    } = this.state;
    switch (sortBy) {
      case "a-z":
        monsters = monsters.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        break;
      case "z-a":
        monsters = monsters.sort((a, b) =>
          b.name > a.name ? 1 : a.name > b.name ? -1 : 0
        );
        break;
      default:
        monsters = this.state.monsters;
    }
    const notifs = notifications.reduce((acc, cur) => {
      for (let monster of monsters) {
        if (monster.id === cur.id) {
          acc.unshift({ ...monster, type: cur.type });
        }
      }
      return acc;
    }, []);
    const myFav = monsters.filter((monster) => favourites.includes(monster.id));
    const whereToSearch = showFavs ? myFav : monsters;
    const filteredMonsters = whereToSearch.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    document.addEventListener("scroll", () => {
      if (this.state.showDrop) this.setState({ showDrop: false });
    });
    return (
      <div
        className="App"
        onClick={(ev) => {
          if (!ev.target.closest(".fa-bell")) {
            this.setState({ showDrop: false });
          }
        }}
      >
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
            favourites.length ? ["Monsters", "Favourites"] : ["Monsters"]
          }
          clicked={(id) => this.navItemHandler(id)}
          added={notifs}
          handleNotif={this.handleNotif}
          recentNotif={recent}
          showDrop={showDrop}
        />
        <h1>Monster Rolodex </h1>
        <SearchBox
          placeholder="Search Monster"
          handleChange={this.handleChange}
        />
        <DropDownMenu selected={(val) => this.handleSelected(val)} />
        {filteredMonsters.length > 0 ? (
          <CardList
            clicked={(ev, id) => this.cardClickHandler(ev, id)}
            monsters={filteredMonsters}
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
