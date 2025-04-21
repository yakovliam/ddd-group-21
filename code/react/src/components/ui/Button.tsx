type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="border border-black font-bold px-2" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
