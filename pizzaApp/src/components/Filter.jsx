export default function Filter({name,onChange}) {
  return (<input value = {name} placeholder= "Search pizzas" onChange = {onChange}/>);
}