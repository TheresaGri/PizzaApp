export default function LabelAndInput({label, id, value, handleChange}) {
  return ( <div> {label}
     <input id = {id} type="text" value = {value} onChange = {handleChange} />
     </div>
  );
}