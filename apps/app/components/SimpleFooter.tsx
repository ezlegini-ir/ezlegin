import Link from "next/link";
import IgraphLogoSquare from "@ezlegin/ui/components/IgraphLogoSquare";
import SocialsIcon from "@ezlegin/ui/components/SocialsIcon";

const SimpleFooter = () => {
  return (
    <div>
      <div className="py-3 border-b border-t flex justify-between items-center">
        <Link href={"/"}>
          <IgraphLogoSquare size={40} />
        </Link>

        <SocialsIcon />
      </div>
    </div>
  );
};

export default SimpleFooter;
