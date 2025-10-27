import Image from "next/image";

interface Props {
  size?: number;
  inputProps?: any;
}

const EzleginLogoSquare = ({ size, inputProps }: Props) => {
  return (
    <Image
      src={"/ezlegin-logo-square.svg"}
      alt={"Ezlegin"}
      width={size || 50}
      height={size || 50}
      draggable={false}
      {...inputProps}
      priority
      loading="eager"
      className="hover:scale-105 transition-transform"
    />
  );
};

export default EzleginLogoSquare;
