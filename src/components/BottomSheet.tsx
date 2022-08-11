import { BottomSheet } from "@rneui/base"
import { useState } from "react"
import { Card } from "react-native-paper"
import React from "react"



export function BottomSheetComponent({
    children,ctx,...props
}) {
    return (
        <BottomSheet isVisible={ctx.opened} {...props}>
            <Card>
                {ctx.opened && children}
            </Card>
        </BottomSheet>
    )

}
export function useBottomSheet() { 
    const [opened,setOpened] = useState(false)
    const [data,setData] = useState(null)
    return {
        opened,
        data,
        open(data) {
            setData(data)
            setOpened(true)
        },
        close() {
            setData(null)
            setOpened(false)
        }
    }
}