import Image from 'next/image'


interface Props {
    width: string | number,
    height: string | number,
    src: string,
    layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined
    alt?: string
}

export const MyImage = ({width, alt, src, height, layout}: Props) => {
    return (
        <Image
            src={src}
            alt={alt}
            layout={layout}
            width={width}
            height={height}
        />
    )
}