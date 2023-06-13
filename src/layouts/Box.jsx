const Box = (props) => {
  return (
    <>
      <a href={`${props.link}`}>
        <div className="box-content h-32 w-32 p-4 border-4 text-center justify-center flex items-center h-20 bg-sky-500/100 text-fuchsia-50">
          {props.text}
        </div>
      </a>
    </>
  );
};
export default Box;
