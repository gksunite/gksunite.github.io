import React from 'react';
import '../css/map.css'
import mapUnite from '../img/map.png';
import OutsideAlerter from './OutsideAlerter';
import { orangeTeam } from '../data/orangeTeam';
import { purpleTeam } from '../data/purpleTeam';
import { pokemon } from '../data/pokemon';
import { object } from '../data/object';

export default class map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectPokemon: false,
			whichPokemon: -1,
			countPokemon: 0,
			openModal: true,
		}
		this.showSelectPokemonModal = this.showSelectPokemonModal.bind(this);
		this.SelectPokemon = this.SelectPokemon.bind(this);
		this.showBackground = this.showBackground.bind(this);
		this.closePlayModal = this.closePlayModal.bind(this);
	}
	closePlayModal(){
		this.setState({ openModal: false });
	}
	showBackground(item){
		const poke = pokemon.find(element => element.image === item);
		if(poke){
			switch(poke.role){
				case 1: return {backgroundColor: "#29a5e3"};
				case 2: return {backgroundColor: "#f16c38"};
				case 3: return {backgroundColor: "#ce5fd3"};
				case 4: return {backgroundColor: "#aced5b"};
				case 5: return {backgroundColor: "#fecc51"};
				default: return {backgroundColor: "#000000"};
			}
		}
		else{
			return null;
		}
	}
	showSelectPokemonModal(show, index, event) {
		if(event.target.className === "object-container"){
			this.setState({ selectPokemon: show, whichPokemon: (index + 0.5) * 2 });
		}else{
			this.setState({ selectPokemon: show, whichPokemon: index * 2 });
		}
	}
	SelectPokemon(src){
		if(this.state.whichPokemon >= 10){
			if(this.state.whichPokemon % 2 === 0){
				const found = orangeTeam.find((element, index) => {
					if(index !== (this.state.whichPokemon / 2) - 5 && element.pokemon === src){
						return true;
					}else{
						return false;
					}
				});
				if(!found){
					orangeTeam[(this.state.whichPokemon - 10) / 2].pokemon = src;
					this.setState({ whichPokemon: this.state.whichPokemon + 1, countPokemon: this.state.countPokemon + 1 });
				}
				else{
					alert("You already have this pokemon!");
				}
			}
			else{
				orangeTeam[(this.state.whichPokemon - 11) / 2].object = src;
				this.setState({ whichPokemon: this.state.whichPokemon + 1 });
			}
		}
		else{
			if(this.state.whichPokemon % 2 === 0){
				const found = purpleTeam.find((element, index) => {
					if(index !== this.state.whichPokemon / 2 && element.pokemon === src){
						return true;
					}else{
						return false;
					}
				});
				if(!found){
				purpleTeam[(this.state.whichPokemon) / 2].pokemon = src;
				this.setState({ whichPokemon: this.state.whichPokemon + 1, countPokemon: this.state.countPokemon + 1 });
				}
				else{
					alert("You already have this pokemon!");
				}
			}
			else{
				purpleTeam[(this.state.whichPokemon - 1) / 2].object = src;
				this.setState({ whichPokemon: this.state.whichPokemon + 1 });
			}
		}
		if(this.state.whichPokemon >= 19){
			this.setState({ selectPokemon: false, whichPokemon: -1 });
		}
	}
	render() {
		var clickoutside = (event) => {
			this.setState({ selectPokemon: false, whichPokemon: -1 });
		  };
		return (
		  <div className="map-container" style={this.state.selectPokemon ? {overflow: "hidden"} : {}}>
			{this.state.selectPokemon && this.state.whichPokemon >= 0 ?
				<OutsideAlerter
				setisActive={clickoutside}
				isActive={this.state.selectPokemon}
				parameterid="orange-chosen-pokemon"
				parameterid2="purple-chosen-pokemon">
					<div className='choose-pokemon' style={this.state.whichPokemon >= 10 ? {"--top": "var(--top-0)"} : {"--top": "var(--top-50)"}}>
						<div className='mid-modal-thing'></div>
						<div className='show-all-pokemon'>
							{this.state.whichPokemon % 2 === 0 ?
							pokemon.map((pokemon, index) => (
								<div onClick={() => this.SelectPokemon(pokemon.image)} className='every-pokemon-shown' style={pokemon.role < 3 ? pokemon.role === 1 ? {"--color": "var(--blue)"} : {"--color": "var(--red)"} : pokemon.role === 3 ? {"--color": "var(--purple)"} : pokemon.role === 4 ? {"--color": "var(--green)"} : {"--color": "var(--yellow)"}}>
									<img className='pokemon-image' src={pokemon.image} alt="pokemon" />
								</div>
							))
							:
							object.map((object, index) => (
								<div onClick={() => this.SelectPokemon(object.image)} className='every-object-shown'>
									<img className='object-image' src={object.image} alt="pokemon" />
								</div>
							))}
						</div>
					</div>
				</OutsideAlerter>
			: null}
			<div className='play-modal'>
				<div className='purple-team-modal' style={this.state.openModal ? null : {animation: "openModal1 1s ease-in-out", top: "-50%"}}>
					{purpleTeam.map((item, index) => (
						<div className='purple-chosen-pokemon' style={this.showBackground(item.pokemon)} >
						<div style={{display: "flex", justifyContent: "center", width: "100%", height: "100%"}} onClick={e => this.showSelectPokemonModal(true, index, e)}>
							{item.pokemon ? <img className='chosen-pokemon-team' src={item.pokemon} alt="pokemon" /> : null}
						</div>
							<div className='object-container-container' onClick={e => this.showSelectPokemonModal(true, index + .5, e)}>
								<div className='object-container'>
									{item.object ? <img onClick={e => this.showSelectPokemonModal(true, index + .5, e)} className='object-image' style={{height: "150%", marginBottom: "1px", marginRight: "1px"}} src={item.object} alt="object" /> : null}
								</div>
							</div>
							</div>
					))
					}
				</div>
				<button className='play-button-modal' style={this.state.openModal ? null : {animation: "openModal3 1s ease-in-out", marginTop: "120vh"}}>{this.state.countPokemon >= 10 ? <span onClick={() => this.closePlayModal()}>START</span> : "CHOOSE"}</button>
				<div className='orange-team-modal' style={this.state.openModal ? null : {animation: "openModal2 1s ease-in-out", top: "110%"}}>
					{orangeTeam.map((item, index) => (
						<div className='orange-chosen-pokemon' style={this.showBackground(item.pokemon)}>
							<div style={{display: "flex", justifyContent: "center", width: "100%", height: "100%"}} onClick={e => this.showSelectPokemonModal(true, index + 5, e)}>
								{item.pokemon ? <img className='chosen-pokemon-team' src={item.pokemon} alt="pokemon" /> : null}
							</div>
							<div className='object-container-container'>
								<div className='object-container'>
									{item.object ? <img onClick={e => this.showSelectPokemonModal(true, index + 5.5, e)} className='object-image' style={{height: "150%", marginBottom: "1px", marginRight: "1px"}} src={item.object} alt="object" /> : null}
								</div>
							</div>
						</div>
					))
					}
				</div>
			</div>
			<img className='map-img-container' src={mapUnite} alt="UniteMap" />
		  </div>
		)
	};
  }