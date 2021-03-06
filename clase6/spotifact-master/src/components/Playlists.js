import React, {Component} from 'react'
import {getPlaylists} from '../requests'
import {Link} from "react-router-dom"
import {newPlaylist} from "../requests"
import {deletePlaylist} from "../requests"
import './styles/styles.css';


class Playlists extends Component{
    constructor(props){
        super(props)

        this.state = {
            playlists:  [],
            form: {
                name: ""
            }
        }

    }


    componentWillMount(){
        getPlaylists()
            .then(response => this.setState({playlists: response.data}))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        newPlaylist(this.state.form.name)
            .then(response => {
                this.setState({
                    playlists: this.state.playlists.concat(response.data)
                })
            })
    };

    handleInputChange = (e) => {
        this.setState({
            form : {
                name: e.target.value
            }

        });
        console.log(e.target.name, e.target.value)
    };

    handleDelete(value){
        console.log(value);
        deletePlaylist(value)
        setTimeout(()=>{
            getPlaylists().then(response => this.setState({playlists: response.data})).then(console.log(this.state))
        },20);




    }

    render(){
        return (
            <div className="playlists-mainWrapper">
                <div className="playlists-menu">
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                    </ul>
                </div>

                <div className="playlists-container">
                <h1>Mis playlists</h1>
                <div className="wrapper">
                    <div className="playlists-list">
                        <p>Lista de playlists</p>
                            <ul className="playlist-list">
                                {
                                    this.state.playlists.map((p, i) =>{
                                    return (
                                            <li key={i}>
                                                <Link key={i} to={`/playlists/${p.id}`}>{p.name}</Link>
                                                <button value={p.id}  onClick={()=>this.handleDelete(`${p.id}`)}>Borrar</button>
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                    </div>
                    <div className="playlist-create">
                        <form action="">
                            <div className="input-container">
                                <input type="text" placeholder="Nombre" name="name"
                                       onChange={this.handleInputChange} value={this.state.form.name} placeholder="Escribe aqui..."/>
                            </div>
                            <button className="search-button" onClick={this.handleSubmit}>Crear</button>



                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}



export default Playlists