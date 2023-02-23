import Button from './Button';

export default function Sorting(props){
  return (
    <div className="soritng-bar">
      <Button onClick={props.onSortName}>sort by name</Button>
      <Button onClick={props.onSortPrice}>sort by price</Button>
    </div>

  );
}
