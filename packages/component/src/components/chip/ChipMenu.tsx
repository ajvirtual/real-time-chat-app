import { Chip, ChipPops } from "@components/chip/Chip"
import { useMemo, useState } from "react";
import _ from "lodash";
import { Dropdown } from "@components/dropdown/Dropdown";
import { Menu, MenuProps } from "@components/menu/Menu";


export const ChipMenu = ({ ChipProps, defaultLabel, value, className, ...props }: ChipMenuProps) => {

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement>();
    const selectedLabel = useMemo(() => {
        return props.items.find((item) => _.isEqual(item.value, value))?.label
    }, [value, props])

    return (
        <>
            <Chip 
                {...ChipProps}
                className={`bg-default ${className}`}
                label={selectedLabel ?? defaultLabel} 
                endIcon={'fa-chevron-down text-xs bg-transparent'}
                onClick={(e) => setAnchorEl(e.currentTarget)} 
                />

            <Dropdown
                anchorEl={anchorEl}
                arrow
                placement="bottom-end"
                onClose={() => setAnchorEl(undefined)}
            >
                <Menu
                    activeFn={(item) => _.isEqual(item.value, value)}
                    {...props}
                    
                />
            </Dropdown>
        </>
    );
}

export type ChipMenuProps = MenuProps & {
    className?: string
    defaultLabel?: string
    value?: any
    ChipProps?: ChipPops
}
