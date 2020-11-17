import { genres as initGenres } from "../../../utils/constants"

const initGenresObject = () => {
    const newObj: { [genre: string]: boolean; } = {}
    for (let genre of initGenres) {
        newObj[genre] = false
    }
    return newObj;
}
export default initGenresObject;