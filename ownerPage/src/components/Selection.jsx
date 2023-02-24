export default function Selection(props) {

  return (
    <>
    <select
      className="selection"
      value={props.select}
      onChange={(event) => props.onChange(event)}>
      {props.data.map((allergen) => (
        <option key={allergen.name} value={allergen.letter}>
          {allergen.letter}
        </option>
      ))}
    </select>
    </>
  );
}
