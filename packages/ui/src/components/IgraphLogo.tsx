import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  inputProps?: any;
  className?: string;
  darkMode?: boolean;
}

const EzleginLogo = ({
  inputProps,
  className,
  width,
  height,
  darkMode,
}: Props) => {
  return (
    <Image
      src={darkMode ? "/ezlegin-logo-dark.svg" : "/ezlegin-logo-light.svg"}
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
