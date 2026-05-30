export const handelposition = (position) => {

    switch (position) {
        case "left":
            return "flex-row gap-1 items-center";
    
        case "top":
        default:
            return "flex-col";
    }
}