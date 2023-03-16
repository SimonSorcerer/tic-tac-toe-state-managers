import { Piece } from '../model';

export interface CellProps {
    id: number;
    cell: Piece | '';
    onCellClick: (id: number) => void;
}

export const Cell: React.FC<CellProps> = ({ id, cell, onCellClick }) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        onCellClick(id);
    };

    return (
        <div className='square' id={id.toString()} onClick={handleClick}>
            <div className={cell} />
        </div>
    );
};
