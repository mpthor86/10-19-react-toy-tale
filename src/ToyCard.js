

function ToyCard(props){
    // const {id, image, name} = props.toy // destructuring is an option
    function handleClick(){
        props.delete(props.id)
    }
    return(
        <div class="card" id={`toy-${props.id}`}>
            <h2>{props.name}</h2>
            <img src={props.image} class="toy-avatar"/>
            <p>{props.likes} Likes </p>
            <button onClick={() => props.addLikes(props.id, props.likes)} class="like-btn">Like &lt;3</button>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default ToyCard