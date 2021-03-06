// search.js
var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var ymirAPI =require('../static/js/ymirWrapper.js');
var Model = ymirAPI(getCookie('worldId'));
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

var CharacterEdit = React.createClass({
	getInitialState: function(){
	    return {places:[], ch:{}}
	},
	componentDidMount: function(){
	    var self = this;
	    Model.Places.all().then(function(res){
	    	console.log(res.data);
	        var st=self.state;
	        st.places = res.data;
	        self.setState(st);
	    }).catch(function(res){
	    	console.log(res)
	    });

		Model.Characters.findOne(this.props.id).then(function(res){
			console.log(res.data);
		    var st=self.state;
		    st.ch = res.data;
		    self.setState(st);
		    document.getElementById('name').value = st.ch.name;
		})
	},
	save: function(){
		var name = document.getElementById('name').value;
		var place =document.getElementById('place').value;
		Model.Characters.update({name:name, placeId:place})
		location.reload()
	},
	render:function(){
		var options = this.state.places.map((i,n)=>{
			return(
				<option key={i.id} value={i.id}>{i.name}</option>
			);
		});
		return(
			<div className="sm-container edit-form">
				<h2 className="text-center">Edit Character</h2>
				<textfield>Name</textfield> <br />
				<input type="text" id="name" />	<br />
				<textfield>Place</textfield> <br />
				<select id="place" selected={this.state.ch.id}>
					{options}
				</select> <br />
				<button onClick={this.save}>SAVE</button>	
				<a className="button" href="Character.html">CANCEL</a>	
			</div>
		)
	}
})	

ReactDOM.render(
  <div>
  	<NavBar />
  	<CharacterEdit id={getCookie("characterEditId")} />
  </div>,
  document.getElementById('react')
);