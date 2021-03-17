const Progress = ({color, status, status_values}) => {
    const { name,  value } = status;
    const status_value = Math.max(...status_values);
    const widthValue = Math.ceil(value/status_value * 100);
    
    return(
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span style={{backgroundColor: color}} className="text-xs text-white font-semibold inline-block py-1 px-2 uppercase rounded-full">
                {name}
              </span>
            </div>
            <div className="text-right">
              <span style={{color: color}} className="text-xs font-semibold inline-block">
                {value}
              </span>
            </div>
          </div>
          <div className="bg-gray-200 overflow-hidden h-3 mb-4 text-xs flex rounded-full">
            <div style={{width: `${widthValue}%`, backgroundColor: color}}></div>
          </div>
        </div>
    );
}

export default Progress;