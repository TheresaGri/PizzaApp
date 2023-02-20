export default function Select(props) {
  return (
    <div>
      <select value={props.select} onChange={(event) => props.onChange(event)}>
        {props.array.map((e, index)=>
        <option key={index} value={e.value} >{e.name}</option>
        )}
        
      </select>
    </div>
  );
}
