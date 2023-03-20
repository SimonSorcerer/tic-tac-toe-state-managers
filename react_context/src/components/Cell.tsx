import { ExtendedPiece } from '../model';

export interface CellProps {
    cell: ExtendedPiece;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick();
    };

    return (
        <div className='square' onClick={handleClick}>
            <div className={cell} />
        </div>
    );
};
