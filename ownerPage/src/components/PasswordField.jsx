export default function PasswordField({className,pressEnter}) {
  return (
     <input className = {className} type="password" onKeyDown={pressEnter} />
  );
}