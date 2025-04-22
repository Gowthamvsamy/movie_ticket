import React, { useEffect, useState } from 'react'

interface SeatSelectProps {
  onData: (price: number | undefined, seats: string[]) => void;
}

function SeatSelect({ onData }: SeatSelectProps) {

  const eliteRow = 8;
  const eliteCol = 22;
  const budgetRow = 2;
  const budgetCol = 24;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();

  const generateSeatId = (row: number, col: number): string => {
    const rowChar = String.fromCharCode(65 + row);
    return `${rowChar}${col + 1}`;
  };

  const getSeatPrice = (seatId: string): number => {
    const rowChar = seatId.charAt(0).toUpperCase();
    if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(rowChar)) {
      return 190;
    } else if (['I', 'J'].includes(rowChar)) {
      return 90
    }
    return 0;
  };

  // Calculate price when selectedSeats change
  useEffect(() => {
    const price = selectedSeats.reduce((total, seatId) => total + getSeatPrice(seatId), 0);
    setTotalPrice(price);
  }, [selectedSeats]);

  const handleClick = () => {
    onData(totalPrice, selectedSeats);
  };
  
  const toggleSeat = (seatId: string): void => {

    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((s) => s !== seatId)
        : [...prevSelected, seatId]
    );
  };


  return (
    <>
      <div className='elite-seat'>
        <h2>RS: 190 ELITE</h2>
      </div>
      <div className='seat-map'>
        {[...Array(eliteRow)].map((_, rowIndex) => {
          const rowChar = String.fromCharCode(65 + rowIndex);
          return (
            <div key={rowIndex} className='seat-row'>
              {/* Print Row Label */}
              <div className='row-label'>{rowChar}</div>

              {/* First half of seats */}
              {[...Array(eliteCol / 2)].map((_, colIndex) => {
                const seatId = generateSeatId(rowIndex, colIndex);
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <div
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {colIndex + 1}
                  </div>
                );
              })}

              {/* Aisle */}
              <div className='aisle'></div>

              {/* Second half of seats */}
              {[...Array(eliteCol / 2)].map((_, colIndex) => {
                const col = colIndex + eliteCol / 2;
                const seatId = generateSeatId(rowIndex, col);
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <div
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {colIndex + 1}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>


      <div className='elite-seat'>
        <h2>RS: 90 BUDGET</h2>
      </div>

      <div className='seat-map'>
        {[...Array(budgetRow)].map((_, rowIndex) => {
          const actualRowIndex = rowIndex + eliteRow; // offset after elite rows
          const rowChar = String.fromCharCode(65 + actualRowIndex);

          return (
            <div key={rowIndex} className='seat-row'>
              <div className='row-label'>{rowChar}</div>

              {[...Array(budgetCol)].map((_, colIndex) => {
                const seatId = generateSeatId(actualRowIndex, colIndex);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <div
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {colIndex + 1}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="screen"></div>

      <div className='selected-info'>
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
      </div>

      <div className='pay-btn'>
        <button onClick={handleClick} className={`totalPrice ${(selectedSeats.length === 0) ? 'hidden' : ''}`}>Pay Rs.{totalPrice}</button>
      </div>
    </>
  )
}

export default SeatSelect