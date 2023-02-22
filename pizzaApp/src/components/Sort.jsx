import Button from './Button';

export default function Sorting(props){
  return (
    <div className="soritng-bar">
      <Button onClick={props.onSort1}>sort by name</Button>
      <Button onClick={props.onSort2}>sort by price</Button>
    </div>

  );
}