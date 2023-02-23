export default function PasswordField({className,pressEnter}) {
  return (
     <input className = {className} type="text" onKeyDown={pressEnter} />
  );
}