import toysObj from './database'
import ToyCard from './ToyCard'
import React from 'react'

// when state changes, a rerender is caused 
// if we want to utilize state we need a Class Component 

// const toys = 
   
class ToysContainer extends React.Component{
    // sets INITIAL STATE
    state = {
        toys: [],
        search: "",
        whatever: "hello"
    }

    delete = (id) => {
        this.setState((prevState) => {
            return {
              toys: prevState.toys.filter(toy => {return toy.id !== id})
            }
        })
    }

    addLikes = (id, likes) =>{
        const configObj = {
            method: 'PATCH',
            headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
            },
            body: JSON.stringify({likes: likes + 1}) 
        }

        fetch(`http://localhost:3000/toys/${id}`, configObj)
        .then(resp => resp.json())
        .then(json => this.updateToy(json))
    }

    updateToy = (json) => {
        this.setState((prevState) => {
            const indexed = prevState.toys.findIndex(toy => toy.id === json.id)
            return {toys: [...prevState.toys.slice(0, indexed), //toys before
                json, //updated toy
                ...prevState.toys.slice(indexed + 1)]} //toys after
        })
    }

    makeToyCards(){
        //utilize STATE
        let displayedToys = this.state.toys
        console.log(this.state.search)
        if(this.state.search){
            displayedToys = this.state.toys.filter((toy) =>  
            toy.name.toLowerCase().includes(this.state.search.toLowerCase()))
        }

        return displayedToys.map(toy => <ToyCard addLikes={this.addLikes} delete={this.delete} toy={toy} id={toy.id} name={toy.name} image={toy.image} likes={toy.likes} />)
    }

    // componentDidUpdate(){
    //     console.log("updatesd", this.state)
    // }

    componentDidMount(){
      // where you make your fetch requests 
      const url ="http://localhost:3000/toys"
      fetch(url)
      .then(res => res.json())
      .then(json => {
          // deal with the json
          console.log(json)
         // this.state.toys = json  //THIS WILL NOT CAUSE A RERENDER
         this.setState({
             toys: json
         })
      })
    }

    handleInputChange = (e) => {
        const search = e.target.value
        this.setState({search: search}) // will cause a rerender
    }


    render(){
        return(
            <div id="toy-container">
                <div>
                    <input type="text" placeholder="Search for a toy..." onChange={this.handleInputChange}/>
                </div>
               {this.makeToyCards()}
            </div>
        ) 
    }
}

export default ToysContainer