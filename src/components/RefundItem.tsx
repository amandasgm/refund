export type RefundItemProps = {
  id: string;
  name: string;
  category: string;
  amount: string;
  categoryImage: string;
};

type Props = React.ComponentProps<"a"> & {
  data: RefundItemProps;
};

export function RefundItem({ data, ...rest }: Props) {
  return (
    <div>
      <a href="" {...rest} className="flex flex-row justify-between items-center hover:bg-green-100/5 transition ease-linear cursor-pointer rounded-md p-2">
        <div className="flex items-center gap-3">
          <img src={data.categoryImage} alt="icone da categoria" className="w-8 h-8"/>
          <div className="flex flex-col flex-1">
            <strong className="text-sm">{data.name}</strong>
            <p className="text-xs">{data.category}</p>
          </div>
        </div>
        <div>
          <span className="flex text-sm items-center">
            <p className="text-gray-300 text-xs mt-[2px]">R$</p> 
            {data.amount}
            </span>
        </div>
      </a>
    </div>
  );
}
