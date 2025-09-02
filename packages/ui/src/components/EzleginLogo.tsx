import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  inputProps?: any;
  className?: string;
  lightMode?: boolean;
}

const EzleginLogo = ({
  inputProps,
  className,
  width,
  height,
  lightMode,
}: Props) => {
  return (
    <Image
      src={lightMode ? "/ezlegin-logo-light.svg" : "/ezlegin-logo-dark.svg"}
      alt={"Ezlegin!"}
      width={width || 142}
      height={height || 30}
      draggable={false}
      {...inputProps}
      className={className}
    />
  );
};

export default EzleginLogo;
