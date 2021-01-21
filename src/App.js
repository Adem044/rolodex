import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/navBar/navBar";
import FullSize from "./components/fullSize/FullSize";
import { CardList } from "./components/card-list/card-list";
import FullCardInfo from "./components/card/fullCardInfo";
import { SearchBox } from "./components/search-box/search-box";
import DropDownMenu from "./components/dropDownMenu/dropDownMenu";
import "./App.css";

export const NotifsContext = React.createContext({
  added: [],
  showDrop: false,
});

export const ModeContext = React.createContext("");

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
      showFull: false,
      clickedImg: 0,
      favourites: JSON.parse(window.localStorage.getItem("favs")) || [],
      showFavs: false,
      sortBy: "default",
      notifications: [],
      recent: [],
      showDrop: false,
      mode: "light",
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", () => {
      if (this.state.showDrop) this.setState({ showDrop: false });
    });
    document.querySelector(".App").onclick = (ev) => {
      if (!ev.target.closest(".fa-bell")) {
        this.setState({ showDrop: false });
      }
    };
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
    if (ev.target.tagName === "IMG") {
      this.setState({ showFull: true, clickedImg: id });
    } else if (ev.target.className.includes("fa-bookmark")) {
      this.setState((prevState) => prevState.recent.push(id));
      if (!this.state.favourites.includes(id)) {
        this.setState(
          (prevState) => prevState.favourites.push(id),
          () => {
            window.localStorage.setItem("favs", `[${this.state.favourites}]`);
          }
        );
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
          () => {
            window.localStorage.setItem("favs", `[${this.state.favourites}]`);
            return this.state.favourites.length
              ? null
              : this.setState({ showFavs: false });
          }
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
  handleNotif = (bool) => {
    this.setState({ recent: [] });
    if (bool)
      this.setState((prev) => {
        return {
          ...prev,
          showDrop: !prev.showDrop,
        };
      });
  };
  handleDelete = () => {
    this.setState({ notifications: [] });
  };

  toggleMode = () => {
    this.setState({
      mode: this.state.mode === "light" ? "dark" : "light",
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
      clickedImg,
      mode,
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
    const appMode = mode === "light" ? "App" : "App app-dark";
    return (
      <div className={appMode}>
        <BrowserRouter>
          {this.state.showFull && (
            <FullSize closeFull={this.closeFull} clickedImg={clickedImg} />
          )}
          <NotifsContext.Provider value={{ added: notifs, showDrop }}>
            <NavBar
              navItems={["Monsters", "Favourites"]}
              clicked={(id) => this.navItemHandler(id)}
              handleNotif={(bool) => this.handleNotif(bool)}
              recentNotif={recent}
              deleteHandler={this.handleDelete}
              mode={mode}
              toggleMode={this.toggleMode}
            />
          </NotifsContext.Provider>
          <h1>Monster Rolodex</h1>
          <SearchBox
            placeholder="Search Monster"
            handleChange={this.handleChange}
          />
          <DropDownMenu selected={(val) => this.handleSelected(val)} />
          <Switch>
            <Route path="/Monsters/:id">
              <FullCardInfo monster={monsters} />
            </Route>
            <Route path="/Favourites">
              <ModeContext.Provider value={mode}>
                <CardList
                  clicked={(ev, id) => this.cardClickHandler(ev, id)}
                  monsters={myFav}
                  myFav={favourites}
                />
              </ModeContext.Provider>
            </Route>
            <Route path="/">
              {filteredMonsters.length > 0 ? (
                <ModeContext.Provider value={mode}>
                  <CardList
                    clicked={(ev, id) => this.cardClickHandler(ev, id)}
                    monsters={filteredMonsters}
                    myFav={favourites}
                  />
                </ModeContext.Provider>
              ) : (
                <p className="error">Username Doesn't Exist</p>
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
