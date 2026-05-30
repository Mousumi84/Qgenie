export const CustomInput = (props) => {
    console.log(props);

    switch (props.type) {
        case "text" :
            return <input type={props.type} />

        case "radio" :
            return <input type={props.type} id={props.value} />
    }
} 