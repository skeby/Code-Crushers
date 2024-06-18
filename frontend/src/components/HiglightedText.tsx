interface Props {
  children?: React.ReactNode;
}

const HiglightedText = ({ children }: Props) => {
  return (
    <label className="rounded-md flex items-center justify-center w-fit bg-secondary p-1">
      <label className="bg-primary text-secondary px-1 text-sm font-semibold py-0 leading-4 tracking-tighter rounded-sm">
        {children}
      </label>
      {/* {children} */}
    </label>
  );
};

export default HiglightedText;
