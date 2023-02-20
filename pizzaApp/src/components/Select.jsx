export default function Select({ select, onChange }) {
  return (
    <div>
      <select value={select} onChange={(event) => onChange(event)}>
        <option>no limit</option>
        <option>5€</option>
        <option>10€</option>
        <option>15€</option>
        <option>20€</option>
      </select>
    </div>
  );
}
