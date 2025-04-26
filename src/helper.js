import customColor from "../android/app/src/utils/customColor";

export const getThemeColor = (theme) => {
    return theme === "dark" ? customColor.Dark : customColor.Light;
};
export const getTextColor = (theme) => {
    return theme === "dark" ? customColor.Light : customColor.Dark;
}