import React, { useState } from 'react'



function SeatSelect() {

	const eliteRow = 8;
	const eliteCol = 25;


	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);


	const generateSeatId = (row: number, col: number): string => {
		const rowChar = String.fromCharCode(65 + row);
		return `${rowChar}${col + 1}`;
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
				{[...Array(eliteRow)].map((_, rowIndex) => (
					<div key={rowIndex} className='seat-row'>
						{[...Array(eliteCol)].map((_, colIndex) => {
							const seatId = generateSeatId(rowIndex, colIndex);
							const isSelected = selectedSeats.includes(seatId);

							return (
								<div
									key={seatId}
									className={`seat ${isSelected ? 'selected' : ''}`}
									onClick={() => toggleSeat(seatId)}
								>
									{seatId}
								</div>
							);
						})}
					</div>
				))}
			</div>
			<div className='selected-info'>
				<p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
			</div>
		</>
	)
}

export default SeatSelect