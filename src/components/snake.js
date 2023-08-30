export default function Snake(props) {
  return (
    <div>
      {props.snakeDots.map((dot,index) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return (
          <div key={index} className="h-[2%] absolute w-[2%] border-[1px] bg-red-500 border-white" style={style}></div>
        );
      })}
    </div>
  );
}
