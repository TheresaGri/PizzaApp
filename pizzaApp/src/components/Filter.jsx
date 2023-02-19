export default function Filter({ name,placeholder, onChange }) {
  return <input value={name} placeholder={placeholder} onChange={onChange} />;
}
