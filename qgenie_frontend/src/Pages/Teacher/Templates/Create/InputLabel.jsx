import { handelposition } from "../../utils/HandelPosition";
import { CustomInput } from "./CustomInput";

function InputLabel(props) {
  const {type,value,label,labelPosition="top",showLabel=true} = props;
  
  return (
      <div>
        <div className={`flex ${handelposition(labelPosition)}`} >
          {showLabel && label && <label htmlFor={value}>{label}</label>}
       

          <CustomInput {...props} />
        </div>
          
      </div>
  )
}

export default InputLabel;






















































/*
const { id, label, labelPosition = "top", showLabel = true } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className={`${labelPosition} flex gap-1`}>
        {showLabel && label && <label className="text-sm text-gray-500 shrink-0" for={id}>{label}</label>}
        <HandleInputRender {...props} />
      </div>
    </div>
  )

  */