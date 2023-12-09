import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

export type MenuType = {
    title: string
    url: string
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string
    },
    subMenu?: {
        title: string
        url: string
    }[]
} 

export type MenuListType = MenuType[]