export default function LabelAndInput({ label, id, value, handleChange }) {
  return (
    <div className="labelDiv">
      <p> {label} </p>
      <input id={id} type="text" value={value} onChange={handleChange} />
    </div>
  );
}
