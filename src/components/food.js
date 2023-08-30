export function Food(props){
        const style = {
          left: `${props.dot[0]}%`,
          top: `${props.dot[1]}%`
        };
        return <div className="h-3 w-3 rounded-2xl z-20 absolute  bg-green-500" style={style} />;
}