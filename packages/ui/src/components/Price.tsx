import { Badge } from "@ezlegin/ui/components/ui/badge";

interface Props {
  basePrice: number;
  price: number;
  discount: Boolean;
}

const Price = ({ basePrice, price, discount }: Props) => {
  return (
    <>
      {!discount ? (
        <>
          {price ? (
            <div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Course Price
                </div>
                <div className="text-2xl font-bold">${price}</div>
              </div>
            </div>
          ) : (
            <Badge variant={"green"}>$0 - Free</Badge>
          )}
        </>
      ) : (
        <div className="">
          <div className="text-xs text-muted-foreground">Course Price</div>
          <div className="flex items-end gap-2">
            <span className="text-muted-foreground relative before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-red-500 before:top-1/2 before:left-0 before:-rotate-6">
              ${basePrice}
            </span>
            <div className="text-2xl font-bold">${price}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Price;
