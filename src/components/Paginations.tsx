import { Button } from "../components/Button";

import leftSvg from "../assets/left.svg";
import rightSvg from "../assets/right.svg";

type Props = {
  current: number;
  total: number;
  onNext: () => void; // metodo para avancar
  onPrevious: () => void; // metodo para voltar
};
export function Pagination({ current, total, onNext, onPrevious }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="iconSmall" onClick={onPrevious} disabled={current === 1}>
        <img src={leftSvg} alt="" />
      </Button>

      <span className="text-sm text-gray-200 ">
        {current}/{total}
      </span>

      <Button variant="iconSmall" onClick={onNext} disabled={current === total}>
        <img src={rightSvg} alt="" />
      </Button>
    </div>
  );
}
