import { useCurrentBreadCrumb } from "@hooks/url"
import { BreadCrumb, BreadCrumbProps } from "./BreadCrumb"

export const CurrentBreadCrumb = (props: CurrentBreadCrumbProps) => {
    const breadCrumb = useCurrentBreadCrumb()

    return (
        <BreadCrumb {...props} items={breadCrumb} />
    )
}

export type CurrentBreadCrumbProps = Omit<BreadCrumbProps, 'items'>
