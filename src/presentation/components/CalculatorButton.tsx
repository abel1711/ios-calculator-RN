import { Pressable, Text, View } from 'react-native';
import { colors, globalStyles } from '../../config/theme/app-theme';


interface Props {
    label: string,
    color?: string,
    largeButton?: boolean;
    blackText?: boolean;
    onPress: () => void;
}

export const CalculatorButton = ({
    label,
    color = colors.darkGray,
    largeButton = false,
    blackText = false,
    onPress
}: Props) => {

    return (
        <Pressable
            onPress={() => onPress()}
            style={({ pressed }) => ({
                ...globalStyles.button,
                width: largeButton ? 180 : 80,
                backgroundColor: color,
                opacity: pressed ? .8 : 1,
            })}
        >
            <Text style={{
                ...globalStyles.buttonText,
                color: blackText ? 'black' : 'white',
            }}>{label}</Text>
        </Pressable>
    )
};