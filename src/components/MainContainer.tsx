import {ReactNode} from "react";
import {SafeAreaView} from "react-native";

interface Props { children: ReactNode, className?: string }

export default function MainContainer({ children, className }: Props) {
    return (
        <SafeAreaView className={`flex-1 ${className}`}>
            {children}
        </SafeAreaView>
    )
}
